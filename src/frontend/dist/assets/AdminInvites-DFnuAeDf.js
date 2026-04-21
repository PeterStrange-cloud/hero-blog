import { e as createLucideIcon, u as useNavigate, a as useIdentity, c as useGetMyRole, I as useListInvites, J as useAddInvite, K as useRemoveInvite, M as useBindInvitePrincipal, r as reactExports, y as Role, j as jsxRuntimeExports, P as PageLoading, S as Shield, B as Button, z as Link, E as ErrorMessage, N as Check, O as formatTimestamp, C as Copy } from "./index-Cb-A1uTt.js";
import { U as Users, B as Badge, T as Trash2 } from "./badge-Bq0NS3jZ.js";
import { I as Input } from "./input-PurMIxoJ.js";
import { L as Label } from "./label-DjZ2-zcl.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DevuM23A.js";
import { u as ue } from "./index-DWSG0y-L.js";
import { C as ChevronLeft } from "./chevron-left-uGDCghyn.js";
import "./index-D2ZrNnFk.js";
import "./index-DaLeZk8p.js";
import "./index-DNZ_Umqy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function AdminInvites() {
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing } = useIdentity();
  const roleQuery = useGetMyRole();
  const invitesQuery = useListInvites();
  const addInvite = useAddInvite();
  const removeInvite = useRemoveInvite();
  const bindPrincipal = useBindInvitePrincipal();
  const [newEmail, setNewEmail] = reactExports.useState("");
  const [newRole, setNewRole] = reactExports.useState(Role.editor);
  const [bindEmail, setBindEmail] = reactExports.useState("");
  const [copiedInvite, setCopiedInvite] = reactExports.useState(null);
  if (!isInitializing && !isAuthenticated) {
    navigate({ to: "/" });
    return null;
  }
  if (isInitializing || roleQuery.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {});
  }
  const role = roleQuery.data ?? null;
  const isSuperadmin = role === Role.superadmin;
  const isAdmin = role === Role.admin || isSuperadmin;
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-24 flex flex-col items-center gap-6 text-center",
        "data-ocid": "invites.not_authorized_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-full bg-muted border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Not Authorized" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-body text-muted-foreground", children: "You need admin or superadmin access to manage invites." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", children: "Back to Dashboard" }) })
        ]
      }
    );
  }
  const handleAddInvite = async (e) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    const result = await addInvite.mutateAsync({
      email: newEmail.trim(),
      role: newRole
    });
    if (result === "ok") {
      ue.success(`Invite sent to ${newEmail}`);
      setNewEmail("");
    } else if (result === "alreadyExists") {
      ue.error("An invite for that email already exists");
    } else {
      ue.error("Failed to add invite");
    }
  };
  const handleRemoveInvite = async (email) => {
    const result = await removeInvite.mutateAsync(email);
    if (result === "ok") {
      ue.success("Invite removed");
    } else {
      ue.error("Failed to remove invite");
    }
  };
  const handleBindPrincipal = async (e) => {
    e.preventDefault();
    if (!bindEmail.trim()) return;
    const result = await bindPrincipal.mutateAsync(bindEmail.trim());
    if (result === "ok") {
      ue.success("Principal bound to invite");
      setBindEmail("");
    } else if (result === "notFound") {
      ue.error("No invite found for that email");
    } else if (result === "alreadyBound") {
      ue.error("This invite already has a principal bound");
    } else {
      ue.error("Failed to bind principal");
    }
  };
  const generateInviteText = (invite) => {
    const roleStr = invite.intendedRole === Role.superadmin ? "Superadmin" : invite.intendedRole === Role.admin ? "Admin" : "Editor";
    const url = window.location.origin;
    return `You have been invited to HERO BLOG as ${roleStr}. Sign in with Internet Identity at ${url} and contact the admin with your principal ID to activate your account.`;
  };
  const handleCopyInviteText = (invite) => {
    navigator.clipboard.writeText(generateInviteText(invite)).then(() => {
      setCopiedInvite(invite.email);
      setTimeout(() => setCopiedInvite(null), 2e3);
    });
  };
  const invites = invitesQuery.data ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10",
      "data-ocid": "invites.page",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Invite Management" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground mt-1", children: "Invite users and manage their access" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Add New Invite" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleAddInvite,
              className: "flex flex-col sm:flex-row gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "invite-email", children: "Email address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "invite-email",
                      type: "email",
                      placeholder: "user@example.com",
                      value: newEmail,
                      onChange: (e) => setNewEmail(e.target.value),
                      required: true,
                      "data-ocid": "invites.email_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "invite-role", children: "Role" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: newRole,
                      onValueChange: (v) => setNewRole(v),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "w-36",
                            id: "invite-role",
                            "data-ocid": "invites.role_select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Role.editor, children: "Editor" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Role.admin, children: "Admin" }),
                          isSuperadmin && /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: Role.superadmin, children: "Superadmin" })
                        ] })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    disabled: addInvite.isPending || !newEmail.trim(),
                    "data-ocid": "invites.add_button",
                    children: addInvite.isPending ? "Adding…" : "Add Invite"
                  }
                ) })
              ]
            }
          )
        ] }),
        isSuperadmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Bind Principal to Invite" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground", children: "When an invited user signs in, use this form to bind their Internet Identity principal to their invite (calls bindInvitePrincipal using the caller's principal)." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleBindPrincipal,
              className: "flex flex-col sm:flex-row gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bind-email", children: "Invited email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "bind-email",
                      type: "email",
                      placeholder: "user@example.com",
                      value: bindEmail,
                      onChange: (e) => setBindEmail(e.target.value),
                      required: true,
                      "data-ocid": "invites.bind_email_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    variant: "outline",
                    disabled: bindPrincipal.isPending || !bindEmail.trim(),
                    "data-ocid": "invites.bind_submit_button",
                    children: bindPrincipal.isPending ? "Binding…" : "Bind My Principal"
                  }
                ) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4 text-muted-foreground" }),
            "Invited Users (",
            invites.length,
            ")"
          ] }),
          invitesQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoading, {}) : invitesQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ErrorMessage,
            {
              title: "Failed to load invites",
              onRetry: () => invitesQuery.refetch()
            }
          ) : invites.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-card border border-border rounded-lg px-6 py-10 text-center text-muted-foreground type-body",
              "data-ocid": "invites.empty_state",
              children: "No invites yet. Add one above."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-card border border-border rounded-lg overflow-hidden",
              "data-ocid": "invites.list",
              children: invites.map((invite, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                InviteRow,
                {
                  invite,
                  index: index + 1,
                  isLast: index === invites.length - 1,
                  isCopied: copiedInvite === invite.email,
                  onRemove: handleRemoveInvite,
                  onCopyInviteText: handleCopyInviteText
                },
                invite.email
              ))
            }
          )
        ] })
      ]
    }
  );
}
function InviteRow({
  invite,
  index,
  isLast,
  isCopied,
  onRemove,
  onCopyInviteText
}) {
  const roleLabel = invite.intendedRole === Role.superadmin ? "Superadmin" : invite.intendedRole === Role.admin ? "Admin" : "Editor";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 ${!isLast ? "border-b border-border" : ""} hover:bg-muted/20 transition-colors duration-150`,
      "data-ocid": `invites.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: invite.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: roleLabel }),
            invite.boundPrincipal ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "default", className: "text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3 mr-1" }),
              " Bound"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Pending" })
          ] }),
          invite.boundPrincipal && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground font-mono text-xs break-all", children: invite.boundPrincipal.toString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "type-meta text-muted-foreground text-xs", children: [
            "Added ",
            formatTimestamp(invite.addedAt),
            invite.boundAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              " · Bound ",
              formatTimestamp(invite.boundAt)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => onCopyInviteText(invite),
              className: "gap-2 text-xs",
              "data-ocid": `invites.copy_invite_text.${index}`,
              children: [
                isCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3.5" }),
                isCopied ? "Copied" : "Copy invite text"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => onRemove(invite.email),
              className: "gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2.5",
              "data-ocid": `invites.remove_button.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5" })
            }
          )
        ] })
      ]
    }
  );
}
export {
  AdminInvites as default
};
