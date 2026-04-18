import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Check,
  ChevronLeft,
  Copy,
  Mail,
  RefreshCw,
  Shield,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Role } from "../backend";
import { ErrorMessage } from "../components/ErrorMessage";
import { PageLoading } from "../components/LoadingSpinner";
import { useIdentity } from "../hooks/useIdentity";
import {
  useAddInvite,
  useBindInvitePrincipal,
  useGetMyRole,
  useListInvites,
  useRemoveInvite,
} from "../hooks/useQueries";
import { formatTimestamp } from "../types";
import type { InvitedUser } from "../types";

export default function AdminInvites() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing } = useIdentity();
  const roleQuery = useGetMyRole();
  const invitesQuery = useListInvites();
  const addInvite = useAddInvite();
  const removeInvite = useRemoveInvite();
  const bindPrincipal = useBindInvitePrincipal();

  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<Role>(Role.editor);
  const [bindEmail, setBindEmail] = useState("");
  const [copiedInvite, setCopiedInvite] = useState<string | null>(null);

  if (!isInitializing && !isAuthenticated) {
    navigate({ to: "/" });
    return null;
  }

  if (isInitializing || roleQuery.isLoading) {
    return <PageLoading />;
  }

  const role = roleQuery.data ?? null;
  const isSuperadmin = role === Role.superadmin;
  const isAdmin = role === Role.admin || isSuperadmin;

  if (!isAdmin) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-24 flex flex-col items-center gap-6 text-center"
        data-ocid="invites.not_authorized_state"
      >
        <div className="p-4 rounded-full bg-muted border border-border">
          <Shield className="size-8 text-muted-foreground" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Not Authorized
        </h1>
        <p className="type-body text-muted-foreground">
          You need admin or superadmin access to manage invites.
        </p>
        <Button variant="outline" asChild>
          <Link to="/admin">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const handleAddInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    const result = await addInvite.mutateAsync({
      email: newEmail.trim(),
      role: newRole,
    });
    if (result === "ok") {
      toast.success(`Invite sent to ${newEmail}`);
      setNewEmail("");
    } else if (result === "alreadyExists") {
      toast.error("An invite for that email already exists");
    } else {
      toast.error("Failed to add invite");
    }
  };

  const handleRemoveInvite = async (email: string) => {
    const result = await removeInvite.mutateAsync(email);
    if (result === "ok") {
      toast.success("Invite removed");
    } else {
      toast.error("Failed to remove invite");
    }
  };

  const handleBindPrincipal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bindEmail.trim()) return;
    const result = await bindPrincipal.mutateAsync(bindEmail.trim());
    if (result === "ok") {
      toast.success("Principal bound to invite");
      setBindEmail("");
    } else if (result === "notFound") {
      toast.error("No invite found for that email");
    } else if (result === "alreadyBound") {
      toast.error("This invite already has a principal bound");
    } else {
      toast.error("Failed to bind principal");
    }
  };

  const generateInviteText = (invite: InvitedUser): string => {
    const roleStr =
      invite.intendedRole === Role.superadmin
        ? "Superadmin"
        : invite.intendedRole === Role.admin
          ? "Admin"
          : "Editor";
    const url = window.location.origin;
    return `You have been invited to HERO BLOG as ${roleStr}. Sign in with Internet Identity at ${url} and contact the admin with your principal ID to activate your account.`;
  };

  const handleCopyInviteText = (invite: InvitedUser) => {
    navigator.clipboard.writeText(generateInviteText(invite)).then(() => {
      setCopiedInvite(invite.email);
      setTimeout(() => setCopiedInvite(null), 2000);
    });
  };

  const invites = invitesQuery.data ?? [];

  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10"
      data-ocid="invites.page"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="gap-2 text-muted-foreground"
        >
          <Link to="/admin">
            <ChevronLeft className="size-4" />
            Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Invite Management
          </h1>
          <p className="type-meta text-muted-foreground mt-1">
            Invite users and manage their access
          </p>
        </div>
      </div>

      {/* Add invite form */}
      <section className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-2">
          <UserPlus className="size-4 text-muted-foreground" />
          <h2 className="font-display font-semibold text-foreground">
            Add New Invite
          </h2>
        </div>
        <form
          onSubmit={handleAddInvite}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="invite-email">Email address</Label>
            <Input
              id="invite-email"
              type="email"
              placeholder="user@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              data-ocid="invites.email_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="invite-role">Role</Label>
            <Select
              value={newRole}
              onValueChange={(v) => setNewRole(v as Role)}
            >
              <SelectTrigger
                className="w-36"
                id="invite-role"
                data-ocid="invites.role_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Role.editor}>Editor</SelectItem>
                <SelectItem value={Role.admin}>Admin</SelectItem>
                {isSuperadmin && (
                  <SelectItem value={Role.superadmin}>Superadmin</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              type="submit"
              disabled={addInvite.isPending || !newEmail.trim()}
              data-ocid="invites.add_button"
            >
              {addInvite.isPending ? "Adding…" : "Add Invite"}
            </Button>
          </div>
        </form>
      </section>

      {/* Bind principal form (superadmin) */}
      {isSuperadmin && (
        <section className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-muted-foreground" />
            <h2 className="font-display font-semibold text-foreground">
              Bind Principal to Invite
            </h2>
          </div>
          <p className="type-meta text-muted-foreground">
            When an invited user signs in, use this form to bind their Internet
            Identity principal to their invite (calls bindInvitePrincipal using
            the caller's principal).
          </p>
          <form
            onSubmit={handleBindPrincipal}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="bind-email">Invited email</Label>
              <Input
                id="bind-email"
                type="email"
                placeholder="user@example.com"
                value={bindEmail}
                onChange={(e) => setBindEmail(e.target.value)}
                required
                data-ocid="invites.bind_email_input"
              />
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                variant="outline"
                disabled={bindPrincipal.isPending || !bindEmail.trim()}
                data-ocid="invites.bind_submit_button"
              >
                {bindPrincipal.isPending ? "Binding…" : "Bind My Principal"}
              </Button>
            </div>
          </form>
        </section>
      )}

      {/* Invite list */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
          <Mail className="size-4 text-muted-foreground" />
          Invited Users ({invites.length})
        </h2>
        {invitesQuery.isLoading ? (
          <PageLoading />
        ) : invitesQuery.isError ? (
          <ErrorMessage
            title="Failed to load invites"
            onRetry={() => invitesQuery.refetch()}
          />
        ) : invites.length === 0 ? (
          <div
            className="bg-card border border-border rounded-lg px-6 py-10 text-center text-muted-foreground type-body"
            data-ocid="invites.empty_state"
          >
            No invites yet. Add one above.
          </div>
        ) : (
          <div
            className="bg-card border border-border rounded-lg overflow-hidden"
            data-ocid="invites.list"
          >
            {invites.map((invite, index) => (
              <InviteRow
                key={invite.email}
                invite={invite}
                index={index + 1}
                isLast={index === invites.length - 1}
                isCopied={copiedInvite === invite.email}
                onRemove={handleRemoveInvite}
                onCopyInviteText={handleCopyInviteText}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

interface InviteRowProps {
  invite: InvitedUser;
  index: number;
  isLast: boolean;
  isCopied: boolean;
  onRemove: (email: string) => void;
  onCopyInviteText: (invite: InvitedUser) => void;
}

function InviteRow({
  invite,
  index,
  isLast,
  isCopied,
  onRemove,
  onCopyInviteText,
}: InviteRowProps) {
  const roleLabel =
    invite.intendedRole === Role.superadmin
      ? "Superadmin"
      : invite.intendedRole === Role.admin
        ? "Admin"
        : "Editor";

  return (
    <div
      className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 ${!isLast ? "border-b border-border" : ""} hover:bg-muted/20 transition-colors duration-150`}
      data-ocid={`invites.item.${index}`}
    >
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-medium text-foreground text-sm">{invite.email}</p>
          <Badge variant="outline" className="text-xs">
            {roleLabel}
          </Badge>
          {invite.boundPrincipal ? (
            <Badge variant="default" className="text-xs">
              <Check className="size-3 mr-1" /> Bound
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs">
              Pending
            </Badge>
          )}
        </div>
        {invite.boundPrincipal && (
          <p className="type-meta text-muted-foreground font-mono text-xs break-all">
            {invite.boundPrincipal.toString()}
          </p>
        )}
        <p className="type-meta text-muted-foreground text-xs">
          Added {formatTimestamp(invite.addedAt)}
          {invite.boundAt && (
            <span> · Bound {formatTimestamp(invite.boundAt)}</span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCopyInviteText(invite)}
          className="gap-2 text-xs"
          data-ocid={`invites.copy_invite_text.${index}`}
        >
          {isCopied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {isCopied ? "Copied" : "Copy invite text"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(invite.email)}
          className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2.5"
          data-ocid={`invites.remove_button.${index}`}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
