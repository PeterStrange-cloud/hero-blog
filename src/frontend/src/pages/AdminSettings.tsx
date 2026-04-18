import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  Copy,
  ImageIcon,
  RefreshCw,
  Shield,
  Trash2,
  Upload,
  UserCheck,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { AdminResult, Role } from "../backend";
import type { SiteSettings } from "../backend";
import { ExternalBlob } from "../backend";
import { ErrorMessage } from "../components/ErrorMessage";
import { PageLoading } from "../components/LoadingSpinner";
import { useIdentity } from "../hooks/useIdentity";
import {
  useGetMyRole,
  useGetSettings,
  useListTrackedPrincipals,
  useListUserRoles,
  useRemoveUserRole,
  useSetUserRole,
  useUpdateSettings,
} from "../hooks/useQueries";
import type { UserId } from "../types";

export default function AdminSettings() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing } = useIdentity();
  const roleQuery = useGetMyRole();
  const settingsQuery = useGetSettings();
  const userRolesQuery = useListUserRoles();
  const trackedQuery = useListTrackedPrincipals();
  const updateSettings = useUpdateSettings();
  const setUserRole = useSetUserRole();
  const removeUserRole = useRemoveUserRole();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [editRolePrincipal, setEditRolePrincipal] = useState<string | null>(
    null,
  );
  const [editRoleValue, setEditRoleValue] = useState<Role>(Role.editor);
  // For assigning roles to tracked (unassigned) principals
  const [assignPrincipal, setAssignPrincipal] = useState<string | null>(null);
  const [assignRoleValue, setAssignRoleValue] = useState<Role>(Role.editor);

  if (!isInitializing && !isAuthenticated) {
    navigate({ to: "/" });
    return null;
  }

  if (isInitializing || roleQuery.isLoading) {
    return <PageLoading />;
  }

  const role = roleQuery.data ?? null;

  if (role !== Role.superadmin) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-24 flex flex-col items-center gap-6 text-center"
        data-ocid="settings.not_authorized_state"
      >
        <div className="p-4 rounded-full bg-muted border border-border">
          <Shield className="size-8 text-muted-foreground" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Not Authorized
        </h1>
        <p className="type-body text-muted-foreground">
          Only superadmins can access settings.
        </p>
        <Button variant="outline" asChild>
          <Link to="/admin">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const settings = settingsQuery.data;

  const handleLogoFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !settings) return;

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      const url = blob.getDirectURL();
      const updated: SiteSettings = { ...settings, logoUrl: url };
      const result = await updateSettings.mutateAsync(updated);
      if (result === "ok") {
        toast.success("Logo uploaded successfully");
      } else {
        toast.error("Failed to save logo URL");
      }
    } catch {
      toast.error("Failed to upload logo");
      setLogoPreview(null);
    } finally {
      setUploadProgress(null);
    }
  };

  const handleRemoveLogo = async () => {
    if (!settings) return;
    const updated: SiteSettings = { ...settings, logoUrl: undefined };
    const result = await updateSettings.mutateAsync(updated);
    if (result === "ok") {
      toast.success("Logo removed");
      setLogoPreview(null);
    } else {
      toast.error("Failed to remove logo");
    }
  };

  const handleSetUserRole = async (target: UserId) => {
    const result = await setUserRole.mutateAsync({
      target,
      role: editRoleValue,
    });
    if (result === AdminResult.ok) {
      toast.success("Role updated");
      setEditRolePrincipal(null);
    } else {
      toast.error("Failed to update role");
    }
  };

  const handleRemoveUserRole = async (target: UserId) => {
    const result = await removeUserRole.mutateAsync(target);
    if (result === AdminResult.ok) {
      toast.success("User role removed");
    } else {
      toast.error("Failed to remove user role");
    }
  };

  const handleAssignRole = async (target: UserId) => {
    const result = await setUserRole.mutateAsync({
      target,
      role: assignRoleValue,
    });
    if (result === AdminResult.ok) {
      toast.success("Role assigned");
      setAssignPrincipal(null);
    } else {
      toast.error("Failed to assign role");
    }
  };

  const handleCopyPrincipal = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Principal copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  const userRoles = userRolesQuery.data ?? [];
  const trackedPrincipals = trackedQuery.data ?? [];
  const currentLogoUrl = logoPreview ?? settings?.logoUrl;

  // Principals that are tracked but have no role assigned
  const assignedPrincipals = new Set(
    userRoles.map((ur) => ur.principal.toString()),
  );
  const unassignedPrincipals = trackedPrincipals.filter(
    (p) => !assignedPrincipals.has(p.toString()),
  );

  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10"
      data-ocid="settings.page"
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
            Settings
          </h1>
          <p className="type-meta text-muted-foreground mt-1">
            Site configuration and access control
          </p>
        </div>
      </div>

      {/* Logo upload */}
      <section className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="size-4 text-muted-foreground" />
          <h2 className="font-display font-semibold text-foreground">
            Site Logo
          </h2>
        </div>
        <p className="type-meta text-muted-foreground">
          Upload a PNG, JPG, or SVG. If no logo is set, the text "HERO BLOG" is
          shown in the header.
        </p>
        <div className="flex items-start gap-4 flex-wrap">
          {currentLogoUrl ? (
            <div className="relative border border-border rounded-lg p-3 bg-muted/20">
              <img
                src={currentLogoUrl}
                alt="Current logo"
                className="h-16 max-w-[180px] object-contain"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveLogo}
                className="absolute -top-2 -right-2 size-6 p-0 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                aria-label="Remove logo"
                data-ocid="settings.remove_logo_button"
              >
                <Trash2 className="size-3" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center gap-2 text-muted-foreground text-sm min-w-[160px]">
              <ImageIcon className="size-8 opacity-40" />
              <span>No logo set</span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              className="hidden"
              onChange={handleLogoFileChange}
              data-ocid="settings.logo_file_input"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadProgress !== null}
              className="gap-2"
              data-ocid="settings.upload_logo_button"
            >
              <Upload className="size-4" />
              {uploadProgress !== null
                ? `Uploading ${uploadProgress}%…`
                : "Upload Logo"}
            </Button>
          </div>
        </div>
      </section>

      {/* ── User Management: tracked principals (no role yet) ── */}
      <section
        className="bg-card border border-border rounded-lg p-6 space-y-4"
        data-ocid="settings.user_management_section"
      >
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <UserCheck className="size-4 text-muted-foreground" />
            <h2 className="font-display font-semibold text-foreground">
              User Management
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => trackedQuery.refetch()}
            disabled={trackedQuery.isFetching}
            className="gap-1.5 text-muted-foreground"
            data-ocid="settings.refresh_tracked_button"
          >
            <RefreshCw
              className={`size-3.5 ${trackedQuery.isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
        <p className="type-meta text-muted-foreground text-sm">
          Principals that have interacted with the app. Assign them a role to
          grant dashboard access.
        </p>

        {trackedQuery.isLoading ? (
          <PageLoading />
        ) : trackedQuery.isError ? (
          <ErrorMessage
            title="Failed to load tracked principals"
            onRetry={() => trackedQuery.refetch()}
          />
        ) : unassignedPrincipals.length === 0 ? (
          <p
            className="type-meta text-muted-foreground text-sm"
            data-ocid="settings.tracked_empty_state"
          >
            No unassigned principals yet. Users appear here after signing in.
          </p>
        ) : (
          <div className="space-y-2" data-ocid="settings.tracked_list">
            {unassignedPrincipals.map((p, index) => {
              const pStr = p.toString();
              const isAssigning = assignPrincipal === pStr;
              return (
                <div
                  key={pStr}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 bg-muted/20 rounded-lg border border-border"
                  data-ocid={`settings.tracked.item.${index + 1}`}
                >
                  <div className="flex-1 min-w-0 flex items-start gap-2">
                    <p className="font-mono text-xs text-foreground break-all flex-1">
                      {pStr}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyPrincipal(pStr)}
                      className="shrink-0 text-muted-foreground hover:text-foreground h-6 w-6 p-0"
                      aria-label="Copy principal"
                      data-ocid={`settings.tracked.copy_button.${index + 1}`}
                    >
                      <Copy className="size-3" />
                    </Button>
                  </div>
                  {isAssigning ? (
                    <div className="flex items-center gap-2">
                      <Select
                        value={assignRoleValue}
                        onValueChange={(v) => setAssignRoleValue(v as Role)}
                      >
                        <SelectTrigger
                          className="w-32"
                          data-ocid={`settings.tracked.assign_select.${index + 1}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Role.editor}>Editor</SelectItem>
                          <SelectItem value={Role.admin}>Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        onClick={() => handleAssignRole(p)}
                        disabled={setUserRole.isPending}
                        data-ocid={`settings.tracked.assign_button.${index + 1}`}
                      >
                        Assign
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setAssignPrincipal(null)}
                        data-ocid={`settings.tracked.cancel_button.${index + 1}`}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setAssignPrincipal(pStr);
                        setAssignRoleValue(Role.editor);
                      }}
                      data-ocid={`settings.tracked.assign_role_button.${index + 1}`}
                    >
                      Assign Role
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── User Roles: existing role assignments ── */}
      <section className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" />
          <h2 className="font-display font-semibold text-foreground">
            Assigned Roles
          </h2>
        </div>
        {userRolesQuery.isLoading ? (
          <PageLoading />
        ) : userRolesQuery.isError ? (
          <ErrorMessage
            title="Failed to load users"
            onRetry={() => userRolesQuery.refetch()}
          />
        ) : userRoles.length === 0 ? (
          <p
            className="type-meta text-muted-foreground"
            data-ocid="settings.users_empty_state"
          >
            No users with roles yet.
          </p>
        ) : (
          <div className="space-y-2" data-ocid="settings.users_list">
            {userRoles.map((ur, index) => {
              const principalStr = ur.principal.toString();
              const isEditing = editRolePrincipal === principalStr;
              const rl =
                ur.role === Role.superadmin
                  ? "Superadmin"
                  : ur.role === Role.admin
                    ? "Admin"
                    : "Editor";
              const bv: "default" | "secondary" | "destructive" | "outline" =
                ur.role === Role.superadmin
                  ? "destructive"
                  : ur.role === Role.admin
                    ? "default"
                    : "secondary";

              return (
                <div
                  key={principalStr}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 bg-muted/20 rounded-lg border border-border"
                  data-ocid={`settings.user_role.item.${index + 1}`}
                >
                  <div className="flex-1 min-w-0 flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-foreground break-all">
                        {principalStr}
                      </p>
                      <Badge variant={bv} className="mt-1 text-xs">
                        {rl}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyPrincipal(principalStr)}
                      className="shrink-0 text-muted-foreground hover:text-foreground h-6 w-6 p-0"
                      aria-label="Copy principal"
                      data-ocid={`settings.user_role.copy_button.${index + 1}`}
                    >
                      <Copy className="size-3" />
                    </Button>
                  </div>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Select
                        value={editRoleValue}
                        onValueChange={(v) => setEditRoleValue(v as Role)}
                      >
                        <SelectTrigger
                          className="w-32"
                          data-ocid={`settings.user_role.edit_select.${index + 1}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Role.editor}>Editor</SelectItem>
                          <SelectItem value={Role.admin}>Admin</SelectItem>
                          <SelectItem value={Role.superadmin}>
                            Superadmin
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        onClick={() => handleSetUserRole(ur.principal)}
                        disabled={setUserRole.isPending}
                        data-ocid={`settings.user_role.save_button.${index + 1}`}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditRolePrincipal(null)}
                        data-ocid={`settings.user_role.cancel_button.${index + 1}`}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditRolePrincipal(principalStr);
                          setEditRoleValue(ur.role);
                        }}
                        data-ocid={`settings.user_role.edit_button.${index + 1}`}
                      >
                        Change Role
                      </Button>
                      {ur.role !== Role.superadmin && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveUserRole(ur.principal)}
                          disabled={removeUserRole.isPending}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          data-ocid={`settings.user_role.delete_button.${index + 1}`}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
