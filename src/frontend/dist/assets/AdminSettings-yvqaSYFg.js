import { e as createLucideIcon, u as useNavigate, a as useIdentity, c as useGetMyRole, y as useGetSettings, z as useListUserRoles, D as useListTrackedPrincipals, G as useUpdateSettings, H as useSetUserRole, I as useRemoveUserRole, r as reactExports, J as Role, j as jsxRuntimeExports, P as PageLoading, S as Shield, B as Button, K as Link, M as RefreshCw, E as ErrorMessage, m as ExternalBlob, A as AdminResult } from "./index-DmduXJ-H.js";
import { T as Trash2, U as Users, B as Badge } from "./badge-CQWTAAgC.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D-1xRYft.js";
import { u as ue } from "./index-D4To4rLc.js";
import { C as ChevronLeft } from "./chevron-left-Diut-VYQ.js";
import { I as Image, U as Upload } from "./upload-CCOu5O-W.js";
import { C as Copy } from "./copy-dOEMAjNn.js";
import "./index-CL5Kmcgg.js";
import "./index-1El3_3GA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode);
function AdminSettings() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing } = useIdentity();
  const roleQuery = useGetMyRole();
  const settingsQuery = useGetSettings();
  const userRolesQuery = useListUserRoles();
  const trackedQuery = useListTrackedPrincipals();
  const updateSettings = useUpdateSettings();
  const setUserRole = useSetUserRole();
  const removeUserRole = useRemoveUserRole();
  const fileInputRef = reactExports.useRef(null);
  const [logoPreview, setLogoPreview] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(null);
  const [editRolePrincipal, setEditRolePrincipal] = reactExports.useState(
    null
  );
  const [editRoleValue, setEditRoleValue] = reactExports.useState(Role.editor);
  const [assignPrincipal, setAssignPrincipal] = reactExports.useState(null);
  const [assignRoleValue, setAssignRoleValue] = reactExports.useState(Role.editor);
  if (!isInitializing && !isAuthenticated) {
    navigate({ to: "/" });
    return null;
  }
  if (isInitializing || roleQuery.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {});
  }
  const role = roleQuery.data ?? null;
  if (role !== Role.superadmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-24 flex flex-col items-center gap-6 text-center",
        "data-ocid": "settings.not_authorized_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-full bg-muted border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Not Authorized" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-body text-muted-foreground", children: "Only superadmins can access settings." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", children: "Back to Dashboard" }) })
        ]
      }
    );
  }
  const settings = settingsQuery.data;
  const handleLogoFileChange = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file || !settings) return;
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      const url = blob.getDirectURL();
      const updated = { ...settings, logoUrl: url };
      const result = await updateSettings.mutateAsync(updated);
      if (result === "ok") {
        ue.success("Logo uploaded successfully");
      } else {
        ue.error("Failed to save logo URL");
      }
    } catch {
      ue.error("Failed to upload logo");
      setLogoPreview(null);
    } finally {
      setUploadProgress(null);
    }
  };
  const handleRemoveLogo = async () => {
    if (!settings) return;
    const updated = { ...settings, logoUrl: void 0 };
    const result = await updateSettings.mutateAsync(updated);
    if (result === "ok") {
      ue.success("Logo removed");
      setLogoPreview(null);
    } else {
      ue.error("Failed to remove logo");
    }
  };
  const handleSetUserRole = async (target) => {
    const result = await setUserRole.mutateAsync({
      target,
      role: editRoleValue
    });
    if (result === AdminResult.ok) {
      ue.success("Role updated");
      setEditRolePrincipal(null);
    } else {
      ue.error("Failed to update role");
    }
  };
  const handleRemoveUserRole = async (target) => {
    const result = await removeUserRole.mutateAsync(target);
    if (result === AdminResult.ok) {
      ue.success("User role removed");
    } else {
      ue.error("Failed to remove user role");
    }
  };
  const handleAssignRole = async (target) => {
    const result = await setUserRole.mutateAsync({
      target,
      role: assignRoleValue
    });
    if (result === AdminResult.ok) {
      ue.success("Role assigned");
      setAssignPrincipal(null);
    } else {
      ue.error("Failed to assign role");
    }
  };
  const handleCopyPrincipal = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      ue.success("Principal copied");
    } catch {
      ue.error("Could not copy");
    }
  };
  const userRoles = userRolesQuery.data ?? [];
  const trackedPrincipals = trackedQuery.data ?? [];
  const currentLogoUrl = logoPreview ?? (settings == null ? void 0 : settings.logoUrl);
  const assignedPrincipals = new Set(
    userRoles.map((ur) => ur.principal.toString())
  );
  const unassignedPrincipals = trackedPrincipals.filter(
    (p) => !assignedPrincipals.has(p.toString())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10",
      "data-ocid": "settings.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              asChild: true,
              className: "gap-2 text-muted-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-4" }),
                "Dashboard"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Settings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground mt-1", children: "Site configuration and access control" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Site Logo" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground", children: 'Upload a PNG, JPG, or SVG. If no logo is set, the text "HERO BLOG" is shown in the header.' }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 flex-wrap", children: [
            currentLogoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative border border-border rounded-lg p-3 bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: currentLogoUrl,
                  alt: "Current logo",
                  className: "h-16 max-w-[180px] object-contain"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: handleRemoveLogo,
                  className: "absolute -top-2 -right-2 size-6 p-0 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90",
                  "aria-label": "Remove logo",
                  "data-ocid": "settings.remove_logo_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center gap-2 text-muted-foreground text-sm min-w-[160px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "size-8 opacity-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "No logo set" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  accept: "image/png,image/jpeg,image/svg+xml",
                  className: "hidden",
                  onChange: handleLogoFileChange,
                  "data-ocid": "settings.logo_file_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  onClick: () => {
                    var _a;
                    return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                  },
                  disabled: uploadProgress !== null,
                  className: "gap-2",
                  "data-ocid": "settings.upload_logo_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-4" }),
                    uploadProgress !== null ? `Uploading ${uploadProgress}%…` : "Upload Logo"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "bg-card border border-border rounded-lg p-6 space-y-4",
            "data-ocid": "settings.user_management_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "size-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "User Management" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => trackedQuery.refetch(),
                    disabled: trackedQuery.isFetching,
                    className: "gap-1.5 text-muted-foreground",
                    "data-ocid": "settings.refresh_tracked_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        RefreshCw,
                        {
                          className: `size-3.5 ${trackedQuery.isFetching ? "animate-spin" : ""}`
                        }
                      ),
                      "Refresh"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground text-sm", children: "Principals that have interacted with the app. Assign them a role to grant dashboard access." }),
              trackedQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {}) : trackedQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                ErrorMessage,
                {
                  title: "Failed to load tracked principals",
                  onRetry: () => trackedQuery.refetch()
                }
              ) : unassignedPrincipals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "type-meta text-muted-foreground text-sm",
                  "data-ocid": "settings.tracked_empty_state",
                  children: "No unassigned principals yet. Users appear here after signing in."
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "settings.tracked_list", children: unassignedPrincipals.map((p, index) => {
                const pStr = p.toString();
                const isAssigning = assignPrincipal === pStr;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 bg-muted/20 rounded-lg border border-border",
                    "data-ocid": `settings.tracked.item.${index + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex items-start gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground break-all flex-1", children: pStr }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "sm",
                            onClick: () => handleCopyPrincipal(pStr),
                            className: "shrink-0 text-muted-foreground hover:text-foreground h-6 w-6 p-0",
                            "aria-label": "Copy principal",
                            "data-ocid": `settings.tracked.copy_button.${index + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3" })
                          }
                        )
                      ] }),
                      isAssigning ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Select,
                          {
                            value: assignRoleValue,
                            onValueChange: (v) => setAssignRoleValue(v),
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                SelectTrigger,
                                {
                                  className: "w-32",
                                  "data-ocid": `settings.tracked.assign_select.${index + 1}`,
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Role.editor, children: "Editor" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Role.admin, children: "Admin" })
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            size: "sm",
                            onClick: () => handleAssignRole(p),
                            disabled: setUserRole.isPending,
                            "data-ocid": `settings.tracked.assign_button.${index + 1}`,
                            children: "Assign"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            size: "sm",
                            variant: "ghost",
                            onClick: () => setAssignPrincipal(null),
                            "data-ocid": `settings.tracked.cancel_button.${index + 1}`,
                            children: "Cancel"
                          }
                        )
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "outline",
                          size: "sm",
                          onClick: () => {
                            setAssignPrincipal(pStr);
                            setAssignRoleValue(Role.editor);
                          },
                          "data-ocid": `settings.tracked.assign_role_button.${index + 1}`,
                          children: "Assign Role"
                        }
                      )
                    ]
                  },
                  pStr
                );
              }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Assigned Roles" })
          ] }),
          userRolesQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {}) : userRolesQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ErrorMessage,
            {
              title: "Failed to load users",
              onRetry: () => userRolesQuery.refetch()
            }
          ) : userRoles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "type-meta text-muted-foreground",
              "data-ocid": "settings.users_empty_state",
              children: "No users with roles yet."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "settings.users_list", children: userRoles.map((ur, index) => {
            const principalStr = ur.principal.toString();
            const isEditing = editRolePrincipal === principalStr;
            const rl = ur.role === Role.superadmin ? "Superadmin" : ur.role === Role.admin ? "Admin" : "Editor";
            const bv = ur.role === Role.superadmin ? "destructive" : ur.role === Role.admin ? "default" : "secondary";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 bg-muted/20 rounded-lg border border-border",
                "data-ocid": `settings.user_role.item.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground break-all", children: principalStr }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: bv, className: "mt-1 text-xs", children: rl })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: () => handleCopyPrincipal(principalStr),
                        className: "shrink-0 text-muted-foreground hover:text-foreground h-6 w-6 p-0",
                        "aria-label": "Copy principal",
                        "data-ocid": `settings.user_role.copy_button.${index + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3" })
                      }
                    )
                  ] }),
                  isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: editRoleValue,
                        onValueChange: (v) => setEditRoleValue(v),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            SelectTrigger,
                            {
                              className: "w-32",
                              "data-ocid": `settings.user_role.edit_select.${index + 1}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Role.editor, children: "Editor" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Role.admin, children: "Admin" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Role.superadmin, children: "Superadmin" })
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        onClick: () => handleSetUserRole(ur.principal),
                        disabled: setUserRole.isPending,
                        "data-ocid": `settings.user_role.save_button.${index + 1}`,
                        children: "Save"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        onClick: () => setEditRolePrincipal(null),
                        "data-ocid": `settings.user_role.cancel_button.${index + 1}`,
                        children: "Cancel"
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        onClick: () => {
                          setEditRolePrincipal(principalStr);
                          setEditRoleValue(ur.role);
                        },
                        "data-ocid": `settings.user_role.edit_button.${index + 1}`,
                        children: "Change Role"
                      }
                    ),
                    ur.role !== Role.superadmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: () => handleRemoveUserRole(ur.principal),
                        disabled: removeUserRole.isPending,
                        className: "text-destructive hover:text-destructive hover:bg-destructive/10",
                        "data-ocid": `settings.user_role.delete_button.${index + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5" })
                      }
                    )
                  ] })
                ]
              },
              principalStr
            );
          }) })
        ] })
      ]
    }
  );
}
export {
  AdminSettings as default
};
