import { Node, nodePasteRule } from "@tiptap/core";

const TWITTER_REGEX = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/(\w+)\/status\/(\d+)/;

function normalizeTweetUrl(url: string): string {
  // Twitter widgets only hydrate twitter.com URLs reliably
  return url.replace(/^https?:\/\/(www\.)?x\.com/, "https://twitter.com");
}

export const Twitter = Node.create({
  name: "twitter",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      url: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-twitter-url]",
        getAttrs: (el) => ({
          url: (el as HTMLElement).getAttribute("data-twitter-url"),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const url = HTMLAttributes.url;
    const tweetUrl = normalizeTweetUrl(url);
    return [
      "div",
      {
        "data-twitter-url": url,
        class: "twitter-embed-wrapper my-4",
      },
      [
        "blockquote",
        { class: "twitter-tweet", "data-dnt": "true" },
        ["a", { href: tweetUrl }, tweetUrl],
      ],
    ];
  },

  addPasteRules() {
    return [
      nodePasteRule({
        find: TWITTER_REGEX,
        type: this.type,
        getAttributes: (match) => ({ url: match[0] }),
      }),
    ];
  },
});

export default Twitter;
