import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ArticlesApi "mixins/articles-api";
import AccessApi "mixins/access-api";
import AdminApi "mixins/admin-api";
import InviteApi "mixins/invite-api";
import SettingsApi "mixins/settings-api";
import PaymentApi "mixins/payment-api";
import ArticleLib "lib/articles";
import AccessLib "lib/access";
import AdminLib "lib/admin";
import InviteLib "lib/invite";
import SettingsLib "lib/settings";
import PaymentLib "lib/payment";
import Principal "mo:core/Principal";



actor self {
  // ── Object storage (cover images) ──────────────────────────────────────────
  include MixinObjectStorage();

  // ── State ───────────────────────────────────────────────────────────────────
  let articleStore = ArticleLib.newStore();
  let accessStore = AccessLib.newStore();
  let adminStore = AdminLib.newStore();
  let paymentRequestStore = PaymentLib.newStore();
  let consumedPayments = PaymentLib.newConsumedSet();
  var _nextPaymentId : Nat = 0;
  let nextPaymentId = { var value = _nextPaymentId };

  // ── Seed superadmin unconditionally on every deploy (idempotent) ───────────
  // setRole overwrites — safe to call repeatedly. No hasSuperadmin guard so
  // these principals are always superadmin after every deploy regardless of state.
  do {
    let seedPrincipal1 = Principal.fromText("cklay-3vxhf-4nit2-k7bcv-avklj-plbmg-efhlx-4bp6c-fon3l-dy2an-eae");
    AdminLib.setRole(adminStore, seedPrincipal1, #superadmin);
    AdminLib.trackPrincipal(adminStore, seedPrincipal1);

    let seedPrincipal2 = Principal.fromText("oolek-56mdr-aagob-stuni-s2ecm-6vdhu-6ncif-gtl4l-75727-q2yih-sqe");
    AdminLib.setRole(adminStore, seedPrincipal2, #superadmin);
    AdminLib.trackPrincipal(adminStore, seedPrincipal2);
  };

  // ── Invite store — pre-seeded with two invited users ────────────────────────
  let inviteStore = InviteLib.newStore();
  do {
    ignore InviteLib.addInvite(inviteStore, "strianopietro@gmail.com", #editor);
    ignore InviteLib.addInvite(inviteStore, "theofficialzerotohero@gmail.com", #editor);
  };

  // ── Settings store ──────────────────────────────────────────────────────────
  let settingsStore = SettingsLib.newStore({
    logoUrl = null;
  });

  // ── Seed sample articles ─────────────────────────────────────────────────────
  // Seed author: management canister principal (placeholder for initial content)
  let seedAuthor = Principal.fromText("aaaaa-aa");
  do {
    // Article 1: Published, free — ICP overview
    let a1 = ArticleLib.createArticle(
      articleStore,
      {
        title = "What is the Internet Computer? A Beginner's Guide to ICP";
        excerpt = "The Internet Computer Protocol (ICP) is a revolutionary blockchain that runs smart contracts at web speed and enables fully on-chain web applications. Here's everything you need to know.";
        content = "# What is the Internet Computer?\n\nThe **Internet Computer Protocol (ICP)** is a next-generation blockchain network developed by the DFINITY Foundation. Unlike traditional blockchains that merely run token contracts, the Internet Computer can host entire web applications entirely on-chain — including frontend, backend logic, and data storage.\n\n## Key Innovations\n\n### Canister Smart Contracts\nICP's execution unit is called a *canister*. Canisters are WebAssembly modules that can serve HTTP requests directly to browsers, store state on-chain, and call external services. They are the building blocks of every ICP application.\n\n### Chain-Key Cryptography\nICP uses a novel cryptographic system called Chain-Key Technology that allows the network to generate digital signatures using a distributed threshold protocol. This powers everything from subnet finality to the network's ability to interact with Bitcoin and Ethereum natively.\n\n### Governance: Network Nervous System (NNS)\nThe Internet Computer is governed by the **Network Nervous System (NNS)**, an on-chain DAO that controls the network's evolution. ICP token holders stake their tokens in *neurons* to vote on proposals and earn voting rewards.\n\n## Why It Matters\n\nTraditional blockchain applications store only critical logic on-chain and rely on centralized cloud providers for hosting, databases, and file storage. This creates a trust gap. ICP eliminates this compromise — every part of your application lives in tamper-proof canisters on a decentralized network.\n\n## The HERO Token\n\nHERO is an ICRC-1 standard token on the Internet Computer. It powers the HERO BLOG platform, granting holders access to premium content, tutorials, and deep-dive ecosystem analyses.";
        coverImage = null;
        category = "Education";
        tags = ["ICP", "Beginner", "Blockchain", "Web3"];
        isPremium = false;
      },
      seedAuthor,
    );
    ignore ArticleLib.publishArticle(articleStore, a1.id);

    // Article 2: Published, premium — DeFi on ICP
    let a2 = ArticleLib.createArticle(
      articleStore,
      {
        title = "DeFi on the Internet Computer: The Complete 2024 Ecosystem Map";
        excerpt = "From DEXs to lending protocols and synthetic assets, the ICP DeFi ecosystem has exploded in 2024. We break down every major protocol, their TVL, and what to watch in 2025.";
        content = "# DeFi on the Internet Computer: The Complete 2024 Ecosystem Map\n\nThe Internet Computer's DeFi ecosystem has matured dramatically. With native Bitcoin integration, Chain-Key Ethereum, and sub-second finality, ICP offers a compelling foundation for financial applications that outperform EVM chains in throughput and cost.\n\n## Why ICP for DeFi?\n\n- **No gas fees for queries** — read operations are free\n- **1-2 second finality** — transactions confirm faster than a credit card swipe\n- **Native BTC integration** — directly hold and transfer Bitcoin without bridges\n- **HTTPS outcalls** — canisters can fetch real-world price data without third-party oracles\n\n## Major Protocols\n\n### ICPSwap\nThe leading AMM DEX on ICP, ICPSwap supports hundreds of ICRC-1 token pairs. Its concentrated liquidity pools and staking vaults have attracted significant TVL.\n\n### Sonic\nSonic is ICP's first community-built DEX with deep HERO/ICP liquidity and cross-chain swaps via Chain-Key technology.\n\n### NNS & SNS DAOs\nStaking ICP in the NNS generates yield from voting rewards. SNS DAOs allow projects to decentralize and raise funds directly on-chain.\n\n## What to Watch in 2025\n\n1. Chain-Key Ethereum expansion — Direct ETH and ERC-20 integrations\n2. ICP stablecoin protocols — Native USD-pegged assets on-chain\n3. Cross-chain DEX aggregators — Route trades across BTC, ETH, and ICP simultaneously";
        coverImage = null;
        category = "DeFi";
        tags = ["DeFi", "DEX", "ICP", "Ecosystem", "Tokens"];
        isPremium = true;
      },
      seedAuthor,
    );
    ignore ArticleLib.publishArticle(articleStore, a2.id);

    // Article 3: Draft, premium — Motoko tutorial (unpublished)
    ignore ArticleLib.createArticle(
      articleStore,
      {
        title = "Building Your First ICP Canister with Motoko: A Step-by-Step Tutorial";
        excerpt = "Motoko is DFINITY's purpose-built language for the Internet Computer. In this hands-on tutorial, we build a production-ready canister from scratch — covering state management, upgrades, and inter-canister calls.";
        content = "# Building Your First ICP Canister with Motoko\n\nMotoko is a statically-typed, actor-based programming language designed specifically for the Internet Computer. Its built-in concurrency model maps directly onto ICP's async message-passing architecture.\n\n## Prerequisites\n\n- Node.js 18+\n- DFX (the IC SDK)\n- Basic knowledge of a statically-typed language\n\n## Project Setup\n\n```bash\ndfx new my_blog --type motoko\ncd my_blog\ndfx start --background\ndfx deploy\n```\n\n## Writing Your First Actor\n\n```motoko\nimport Time \"mo:core/Time\";\nimport Map \"mo:core/Map\";\n\nactor {\n  let posts = Map.empty<Nat, Text>();\n  var nextId : Nat = 0;\n\n  public func createPost(content : Text) : async Nat {\n    let id = nextId;\n    nextId += 1;\n    posts.add(id, content);\n    id;\n  };\n};\n```\n\n## State Persistence\n\nICP uses enhanced orthogonal persistence — actor state is automatically persisted across upgrades without any special annotations.\n\nThis article is being finalized. Subscribe to HERO BLOG to get notified when it publishes.";
        coverImage = null;
        category = "Tutorial";
        tags = ["Motoko", "Tutorial", "Development", "ICP"];
        isPremium = true;
      },
      seedAuthor,
    );
    // Article 3 remains unpublished (draft)
  };

  // ── Mixins ──────────────────────────────────────────────────────────────────
  include ArticlesApi(articleStore, adminStore);
  include AccessApi(accessStore, articleStore);
  include AdminApi(adminStore);
  include InviteApi(inviteStore, adminStore);
  include SettingsApi(settingsStore, adminStore);
  include PaymentApi(accessStore, paymentRequestStore, consumedPayments, adminStore, nextPaymentId);
};
