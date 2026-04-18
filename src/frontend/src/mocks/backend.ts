import type { backendInterface } from "../backend";
import { AdminResult, InviteResult, PaymentStatus, Role, SettingsResult } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const now = BigInt(Date.now()) * 1_000_000n;
const oneDay = 86_400_000_000_000n;

const samplePrincipal = { toText: () => "aaaaa-aa", toString: () => "aaaaa-aa" } as Principal;

const article1 = {
  id: 1n,
  title: "What is the Internet Computer? A Beginner's Guide to ICP",
  excerpt:
    "The Internet Computer Protocol (ICP) is a revolutionary blockchain that runs smart contracts at web speed and enables fully on-chain web applications. Here's everything you need to know.",
  category: "Education",
  tags: ["ICP", "Beginner", "Blockchain", "Web3"],
  isPremium: false,
  isPublished: true,
  createdAt: now - oneDay * 5n,
  updatedAt: now - oneDay * 5n,
  authorPrincipal: samplePrincipal,
  coverImage: undefined,
};

const article2 = {
  id: 2n,
  title: "DeFi on the Internet Computer: The Complete 2024 Ecosystem Map",
  excerpt:
    "From DEXs to lending protocols and synthetic assets, the ICP DeFi ecosystem has exploded in 2024. We break down every major protocol, their TVL, and what to watch in 2025.",
  category: "DeFi",
  tags: ["DeFi", "DEX", "ICP", "Ecosystem", "Tokens"],
  isPremium: true,
  isPublished: true,
  createdAt: now - oneDay * 2n,
  updatedAt: now - oneDay * 2n,
  authorPrincipal: samplePrincipal,
  coverImage: undefined,
};

export const mockBackend: backendInterface = {
  _immutableObjectStorageBlobsAreLive: async (_hashes) => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async (_blobs) => {},
  _immutableObjectStorageCreateCertificate: async (_blobHash) => ({ method: "", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async (_info) => ({}),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => {},
  addAdmin: async (_newAdmin) => AdminResult.ok,
  addInvite: async (_email, _role) => InviteResult.ok,
  bindInvitePrincipal: async (_email) => InviteResult.ok,
  createArticle: async (input) => ({
    id: 3n,
    title: input.title,
    excerpt: input.excerpt,
    category: input.category,
    tags: input.tags,
    isPremium: input.isPremium,
    isPublished: false,
    createdAt: now,
    updatedAt: now,
    authorPrincipal: samplePrincipal,
    coverImage: undefined,
  }),
  deleteArticle: async (_id) => AdminResult.ok,
  getAllArticlesAdmin: async () => [article1, article2],
  getArticle: async (id) => {
    if (id === 1n)
      return {
        ...article1,
        content:
          "# What is the Internet Computer?\n\nThe **Internet Computer Protocol (ICP)** is a next-generation blockchain network developed by the DFINITY Foundation. Unlike traditional blockchains that merely run token contracts, the Internet Computer can host entire web applications entirely on-chain — including frontend, backend logic, and data storage.\n\n## Key Innovations\n\nCanisters are WebAssembly modules that can serve HTTP requests directly to browsers, store state on-chain, and call external services. The Internet Computer uses Chain-Key cryptography and is governed by the NNS DAO.\n\n## The HERO Token\n\nHERO is an ICRC-1 standard token powering the HERO BLOG platform.",
      };
    if (id === 2n)
      return {
        ...article2,
        content:
          "# DeFi on the Internet Computer\n\nThe ICP DeFi ecosystem has matured dramatically with native Bitcoin integration, Chain-Key Ethereum, and sub-second finality.\n\n## Major Protocols\n\nICPSwap, Sonic, and NNS/SNS DAOs form the backbone of ICP DeFi. Watch for Chain-Key Ethereum expansion and cross-chain DEX aggregators in 2025.",
      };
    return null;
  },
  getArticleCard: async (id) => {
    if (id === 1n) return article1;
    if (id === 2n) return article2;
    return null;
  },
  getInviteByEmail: async (_email) => null,
  getLogoUrl: async () => null,
  getMyRole: async () => Role.superadmin,
  getPublishedArticles: async () => [article1, article2],
  getSettings: async () => ({
    logoUrl: undefined,
  }),
  getUserAccess: async () => ({
    isSubscribed: false,
    unlockedArticleIds: [],
    subscription: undefined,
  }),
  initSuperadmin: async () => AdminResult.ok,
  isAuthorized: async () => true,
  listAdmins: async () => [samplePrincipal],
  hasSuperadmin: async () => true,
  listTrackedPrincipals: async () => [samplePrincipal],
  listInvites: async () => [
    {
      email: "strianopietro@gmail.com",
      intendedRole: Role.editor,
      addedAt: now - oneDay * 3n,
      boundPrincipal: undefined,
      boundAt: undefined,
    },
    {
      email: "theofficialzerotohero@gmail.com",
      intendedRole: Role.admin,
      addedAt: now - oneDay * 1n,
      boundPrincipal: undefined,
      boundAt: undefined,
    },
  ],
  listUserRoles: async () => [
    { principal: samplePrincipal, role: Role.superadmin },
  ],
  publishArticle: async (_id) => AdminResult.ok,
  removeAdmin: async (_target) => AdminResult.ok,
  removeInvite: async (_email) => InviteResult.ok,
  removeUserRole: async (_target) => AdminResult.ok,
  setUserRole: async (_target, _role) => AdminResult.ok,
  unpublishArticle: async (_id) => AdminResult.ok,
  updateArticle: async (_id, _input) => AdminResult.ok,
  updateSettings: async (_updated) => SettingsResult.ok,
  createPaymentRequest: async (paymentType) => ({
    id: 1n,
    status: PaymentStatus.Pending,
    expiresAt: BigInt(Date.now()) * 1_000_000n + 1_800_000_000_000n,
    userId: samplePrincipal,
    ownerPrincipal: "7ipgs-pmuew-kn3oz-4am7i-j6qth-hk7fo-tb3hc-rk32c-pnef2-ys2cd-rqe",
    createdAt: BigInt(Date.now()) * 1_000_000n,
    subaccount: new Uint8Array(32),
    paymentType,
    amountE8s: paymentType.__kind__ === "ArticleUnlock" ? 100_000_000n : 1_000_000_000n,
  }),
  getMyPaymentRequests: async () => [],
  verifyPaymentRequest: async (_reqId) => ({ __kind__: "err" as const, err: "payment not found" }),
};
