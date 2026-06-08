import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarPlus, Trash2, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useIdentity } from "../hooks/useIdentity";
import { useGetMyRole } from "../hooks/useQueries";
import { PageLoading } from "../components/LoadingSpinner";
import { Role } from "../backend";
import { useBackend, type BackendState } from "../hooks/useBackend";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ZURICH_OFFSET = 60; // UTC+1 in winter, +2 in summer — we use browser's Intl for display

function toZurichDatetimeLocal(timestampNs: bigint): string {
  const ms = Number(timestampNs / 1_000_000n);
  const date = new Date(ms);
  const zurich = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Zurich",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  }).format(date);
  return zurich.replace(" ", "T");
}

function formatSlotDisplay(timestampNs: bigint): string {
  const ms = Number(timestampNs / 1_000_000n);
  return new Intl.DateTimeFormat("en-CH", {
    timeZone: "Europe/Zurich",
    weekday: "short",
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
    hour12: false,
  }).format(new Date(ms)) + " (Zurich)";
}

function datetimeLocalToNs(value: string): bigint {
  // value is in Zurich local time from the input
  // We need to convert Zurich local -> UTC -> nanoseconds
  const zurichMs = new Date(value).getTime();
  return BigInt(zurichMs) * 1_000_000n;
}

export default function AdminBooking() {
  const { isAuthenticated, isInitializing } = useIdentity();
  const roleQuery = useGetMyRole();
  const { actor: backend } = useBackend();
  const queryClient = useQueryClient();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState<"Thirty" | "Sixty">("Thirty");

  const slotsQuery = useQuery({
    queryKey: ["allSlots"],
    queryFn: async () => {
      if (!backend) return [];
      const result = await backend.getAllSlots();
      return result as any[];
    },
    enabled: isAuthenticated && !!backend,
  });

  const createSlotMutation = useMutation({
    mutationFn: async ({ startTimeNs, dur }: { startTimeNs: bigint; dur: "Thirty" | "Sixty" }) => {
      if (!backend) throw new Error("Not connected");
      const durationVariant = dur === "Thirty" ? { Thirty: null } : { Sixty: null };
      console.log("calling createSlot", startTimeNs.toString(), durationVariant);
      const result = await backend.createSlot(startTimeNs, durationVariant);
      console.log("createSlot result", JSON.stringify(result, (_, v) => typeof v === "bigint" ? v.toString() : v));
      if (result && "err" in result) throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      toast.success("Slot created");
      queryClient.invalidateQueries({ queryKey: ["allSlots"] });
      setDate("");
      setTime("");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to create slot"),
  });

  const deleteSlotMutation = useMutation({
    mutationFn: async (slotId: bigint) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.deleteSlot(slotId);
      if ("err" in result) throw new Error(result.err);
    },
    onSuccess: () => {
      toast.success("Slot deleted");
      queryClient.invalidateQueries({ queryKey: ["allSlots"] });
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to delete slot"),
  });

  if (isInitializing || roleQuery.isLoading) return <PageLoading />;

  const role = roleQuery.data ?? null;
  const isAdmin = role === Role.admin || role === Role.superadmin;
  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-muted-foreground">Not authorized.</p>
      </div>
    );
  }

  const handleCreate = () => {
    console.log("handleCreate called", { date, time, backend: !!backend });
    if (!date || !time) {
      toast.error("Please select a date and time");
      return;
    }
    if (!backend) {
      toast.error("Backend not connected. Please try again.");
      return;
    }
    const datetimeLocal = date + "T" + time;
    const startTimeNs = datetimeLocalToNs(datetimeLocal);
    console.log("Calling createSlot with", startTimeNs.toString(), duration);
    createSlotMutation.mutate({ startTimeNs, dur: duration });
  };

  const slots: any[] = slotsQuery.data ?? [];
  const sorted = [...slots].sort((a, b) => Number(BigInt(a.startTime) - BigInt(b.startTime)));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/admin" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Booking Availability</h1>
          <p className="type-meta text-muted-foreground mt-1">All times are set and displayed in Zurich time (Europe/Zurich)</p>
        </div>
      </div>

      {/* Create slot form */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <CalendarPlus className="size-5 text-[oklch(0.72_0.20_145)]" />
          Add New Slot
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col gap-1.5">
            <label className="type-label text-xs text-muted-foreground uppercase tracking-wide">Date (Zurich)</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="input-dark px-3 py-2 text-sm rounded-md w-full"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="type-label text-xs text-muted-foreground uppercase tracking-wide">Time (Zurich)</label>
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="input-dark px-3 py-2 text-sm rounded-md w-full"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="type-label text-xs text-muted-foreground uppercase tracking-wide">Duration</label>
            <select
              value={duration}
              onChange={e => setDuration(e.target.value as "Thirty" | "Sixty")}
              className="input-dark px-3 py-2 text-sm rounded-md w-full"
            >
              <option value="Thirty">30 min — 100,000 HERO</option>
              <option value="Sixty">60 min — 200,000 HERO</option>
            </select>
          </div>
        </div>
        <Button
          onClick={handleCreate}
          disabled={createSlotMutation.isPending}
          className="btn-primary gap-2"
        >
          {createSlotMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <CalendarPlus className="size-4" />}
          Add Slot
        </Button>
      </div>

      {/* Slots list */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-muted/30 flex items-center gap-2">
          <Clock className="size-4 text-muted-foreground" />
          <span className="type-label text-muted-foreground text-[10px] uppercase tracking-wide">
            {sorted.length} slot{sorted.length !== 1 ? "s" : ""} scheduled
          </span>
        </div>

        {slotsQuery.isLoading ? (
          <div className="px-5 py-8 text-center text-muted-foreground text-sm">Loading...</div>
        ) : sorted.length === 0 ? (
          <div className="px-5 py-8 text-center text-muted-foreground text-sm">No slots yet. Add one above.</div>
        ) : (
          sorted.map((slot, index) => {
            const isBooked = "Booked" in slot.status;
            const isCompleted = "Completed" in slot.status;
            const dur = "Thirty" in slot.duration ? "30 min" : "60 min";
            const price = "Thirty" in slot.duration ? "100,000 HERO" : "200,000 HERO";
            return (
              <div
                key={slot.id.toString()}
                className={`px-5 py-4 flex items-center justify-between gap-4 ${index < sorted.length - 1 ? "border-b border-border" : ""} hover:bg-muted/20 transition-colors`}
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-medium text-sm text-foreground">
                    {formatSlotDisplay(BigInt(slot.startTime))}
                  </span>
                  <span className="type-meta text-muted-foreground">
                    {dur} · {price}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                    isBooked ? "text-amber-400 border-amber-400/40 bg-amber-400/10" :
                    isCompleted ? "text-muted-foreground border-border bg-muted/20" :
                    "text-[oklch(0.72_0.20_145)] border-[oklch(0.72_0.20_145)]/40 bg-[oklch(0.72_0.20_145)]/10"
                  }`}>
                    {isBooked ? "Booked" : isCompleted ? "Completed" : "Available"}
                  </span>
                  {!isBooked && !isCompleted && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSlotMutation.mutate(BigInt(slot.id))}
                      disabled={deleteSlotMutation.isPending}
                      className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2.5"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
