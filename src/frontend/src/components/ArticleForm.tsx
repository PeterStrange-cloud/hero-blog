import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ImageIcon, Upload, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TiptapLink from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { ExternalBlob } from "../backend";
import { InlineError } from "./ErrorMessage";



export interface ArticleFormValues {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  isPremium: boolean;
  publishNow: boolean;
  coverImage?: ExternalBlob;
}

interface ArticleFormProps {
  defaultValues?: Partial<ArticleFormValues>;
  onSubmit: (values: ArticleFormValues) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
  backTo: string;
}

const empty: ArticleFormValues = {
  title: "",
  excerpt: "",
  content: "",
  category: "",
  tags: "",
  isPremium: false,
  publishNow: false,
  coverImage: undefined,
};

export function ArticleForm({
  defaultValues = {},
  onSubmit,
  isSubmitting,
  submitLabel,
  backTo,
}: ArticleFormProps) {
  const initial = { ...empty, ...defaultValues };
  const [values, setValues] = useState<ArticleFormValues>(initial);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ArticleFormValues, string>>
  >({});
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initial.coverImage ? initial.coverImage.getDirectURL() : null,
  );
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorImageInputRef = useRef<HTMLInputElement>(null);

  const handleEditorImageFile = useCallback((file: File) => {
    if (file.size > 500 * 1024) {
      alert("Inline image is too large. Maximum size is 500KB.");
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (img.width < 600) {
        alert(`Image too small. Minimum width is 600px (yours is ${img.width}px).`);
        return;
      }
      const MAX_W = 600;
      const scale = img.width > MAX_W ? MAX_W / img.width : 1;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL("image/jpeg", 0.55);
      editor?.chain().focus().setImage({ src: base64 }).run();
    };
    img.src = url;
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: true }),
      TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TiptapLink.configure({ openOnClick: false }),
      Underline,
    ],
    content: initial.content || "",
    onUpdate: ({ editor }) => {
      set("content", editor.getHTML());
    },
  });

  // Sync external defaultValues content into editor on mount
  useEffect(() => {
    if (editor && initial.content && editor.isEmpty) {
      editor.commands.setContent(initial.content);
    }
  }, [editor]);

  const set = useCallback(
    <K extends keyof ArticleFormValues>(key: K, val: ArticleFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: val }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [],
  );

  const handleImageSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 1 * 1024 * 1024) {
      alert("Cover image is too large. Maximum size is 1MB. Please compress or resize your image.");
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
    setUploadProgress(0);

    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
      setUploadProgress(pct);
    });

    set("coverImage", blob);
    setUploadProgress(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageSelect(file);
  };

  const removeCover = () => {
    setCoverPreview(null);
    set("coverImage", undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ArticleFormValues, string>> = {};
    if (!values.title.trim()) errs.title = "Title is required";
    if (!values.content.trim() || values.content === "<p></p>")
      errs.content = "Content is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      data-ocid="article_form.form"
    >
      {/* Back link */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="gap-2 text-muted-foreground hover:text-foreground -ml-2"
        >
          <Link to={backTo}>
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {/* Cover image */}
      <div className="space-y-2">
        <Label className="type-label text-[11px]">Cover Image</Label>
        {coverPreview ? (
          <div className="relative rounded-lg overflow-hidden border border-border">
            <img
              src={coverPreview}
              alt="Cover preview"
              className="w-full h-48 object-cover"
            />
            {uploadProgress !== null && (
              <div className="absolute inset-0 bg-background/70 flex flex-col items-center justify-center gap-2">
                <div className="w-40 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span className="type-meta">{uploadProgress}%</span>
              </div>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeCover}
              className="absolute top-2 right-2 h-7 w-7 p-0 bg-background/80 hover:bg-background text-foreground rounded-full"
              aria-label="Remove cover image"
              data-ocid="article_form.remove_cover_button"
            >
              <X className="size-3.5" />
            </Button>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/40 hover:bg-muted/20 transition-colors duration-200"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            data-ocid="article_form.cover_dropzone"
          >
            <div className="p-3 rounded-full bg-muted border border-border text-muted-foreground">
              <ImageIcon className="size-5" />
            </div>
            <div className="text-center">
              <p className="type-body text-foreground font-medium">
                Drop an image or click to upload
              </p>
              <p className="type-meta text-muted-foreground mt-0.5">
                JPG, PNG, WebP up to 1MB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2 mt-1"
              onClick={() => fileInputRef.current?.click()}
              data-ocid="article_form.upload_button"
            >
              <Upload className="size-3.5" />
              Choose File
            </Button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageSelect(file);
          }}
          data-ocid="article_form.file_input"
        />
      </div>

      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title" className="type-label text-[11px]">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          value={values.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Enter article title…"
          className="font-display text-lg h-11"
          data-ocid="article_form.title_input"
        />
        {errors.title && (
          <span data-ocid="article_form.title_field_error">
            <InlineError message={errors.title} />
          </span>
        )}
      </div>

      {/* Excerpt */}
      <div className="space-y-1.5">
        <Label htmlFor="excerpt" className="type-label text-[11px]">
          Excerpt
        </Label>
        <Textarea
          id="excerpt"
          value={values.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          placeholder="A brief description of the article…"
          rows={3}
          data-ocid="article_form.excerpt_textarea"
        />
      </div>

      {/* Category + Tags */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="category" className="type-label text-[11px]">
            Category
          </Label>
          <Input
            id="category"
            value={values.category}
            onChange={(e) => set("category", e.target.value)}
            placeholder="e.g. ICP, Web3, Tutorial"
            data-ocid="article_form.category_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tags" className="type-label text-[11px]">
            Tags{" "}
            <span className="text-muted-foreground font-normal normal-case">
              (comma-separated)
            </span>
          </Label>
          <Input
            id="tags"
            value={values.tags}
            onChange={(e) => set("tags", e.target.value)}
            placeholder="e.g. defi, nft, identity"
            data-ocid="article_form.tags_input"
          />
        </div>
      </div>

      {/* Content editor */}
      <div className="space-y-1.5">
        <Label className="type-label text-[11px]">
          Content <span className="text-destructive">*</span>
        </Label>
        <div className={isFullscreen ? "fixed inset-0 z-50 flex flex-col bg-card overflow-auto" : "relative"}>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 px-2 py-2 bg-[oklch(0.28_0.025_50)] border border-border rounded-t-lg">
            {/* Text style */}
            <select
              className="h-7 px-2 text-xs bg-[oklch(0.28_0.025_50)] text-[#f0ebe0] border border-[oklch(0.4_0.03_50)] rounded cursor-pointer"
              onChange={(e) => {
                const v = e.target.value;
                if (v === "p") editor?.chain().focus().setParagraph().run();
                else editor?.chain().focus().toggleHeading({ level: parseInt(v) as 1|2|3 }).run();
              }}
            >
              <option value="p">Normal</option>
              <option value="1">H1</option>
              <option value="2">H2</option>
              <option value="3">H3</option>
            </select>
            <div className="w-px h-5 bg-[oklch(0.4_0.03_50)]" />
            {[
              { label: "B", title: "Bold", action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive("bold") },
              { label: "I", title: "Italic", action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive("italic") },
              { label: "U", title: "Underline", action: () => editor?.chain().focus().toggleUnderline?.().run(), active: editor?.isActive("underline") },
              { label: "S", title: "Strike", action: () => editor?.chain().focus().toggleStrike().run(), active: editor?.isActive("strike") },
            ].map(({ label, title, action, active }) => (
              <button key={title} type="button" title={title} onClick={action}
                className={`w-7 h-7 text-xs font-bold rounded transition-colors ${active ? "bg-[oklch(0.75_0.19_50)] text-[oklch(0.15_0.02_50)]" : "text-[#f0ebe0] hover:bg-[oklch(0.35_0.03_50)]"}`}>
                {label}
              </button>
            ))}
            <div className="w-px h-5 bg-[oklch(0.4_0.03_50)]" />
            {/* Align */}
            {(["left","center","right"] as const).map((a) => (
              <button key={a} type="button" title={`Align ${a}`}
                onClick={() => editor?.chain().focus().setTextAlign(a).run()}
                className={`w-7 h-7 text-xs rounded transition-colors ${editor?.isActive({textAlign:a}) ? "bg-[oklch(0.75_0.19_50)] text-[oklch(0.15_0.02_50)]" : "text-[#f0ebe0] hover:bg-[oklch(0.35_0.03_50)]"}`}>
                {a === "left" ? "⬅" : a === "center" ? "☰" : "➡"}
              </button>
            ))}
            <div className="w-px h-5 bg-[oklch(0.4_0.03_50)]" />
            {/* Lists */}
            <button type="button" title="Bullet list" onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={`w-7 h-7 text-xs rounded transition-colors ${editor?.isActive("bulletList") ? "bg-[oklch(0.75_0.19_50)] text-[oklch(0.15_0.02_50)]" : "text-[#f0ebe0] hover:bg-[oklch(0.35_0.03_50)]"}`}>≡</button>
            <button type="button" title="Ordered list" onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              className={`w-7 h-7 text-xs rounded transition-colors ${editor?.isActive("orderedList") ? "bg-[oklch(0.75_0.19_50)] text-[oklch(0.15_0.02_50)]" : "text-[#f0ebe0] hover:bg-[oklch(0.35_0.03_50)]"}`}>1.</button>
            <button type="button" title="Blockquote" onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              className={`w-7 h-7 text-xs rounded transition-colors ${editor?.isActive("blockquote") ? "bg-[oklch(0.75_0.19_50)] text-[oklch(0.15_0.02_50)]" : "text-[#f0ebe0] hover:bg-[oklch(0.35_0.03_50)]"}`}>"</button>
            <div className="w-px h-5 bg-[oklch(0.4_0.03_50)]" />
            {/* Image */}
            <button type="button" title="Insert image" onClick={() => editorImageInputRef.current?.click()}
              className="w-7 h-7 text-xs rounded text-[#f0ebe0] hover:bg-[oklch(0.35_0.03_50)] transition-colors">🖼</button>
            {/* Link */}
            <button type="button" title="Insert link" onClick={() => {
              const url = window.prompt("URL:");
              if (url) editor?.chain().focus().setLink({ href: url }).run();
            }} className="w-7 h-7 text-xs rounded text-[#f0ebe0] hover:bg-[oklch(0.35_0.03_50)] transition-colors">🔗</button>
            {/* Clear */}
            <button type="button" title="Clear formatting" onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}
              className="w-7 h-7 text-xs rounded text-[#f0ebe0] hover:bg-[oklch(0.35_0.03_50)] transition-colors">Tx</button>
            <div className="flex-1" />
            <button type="button" onClick={() => setIsFullscreen((f) => !f)}
              className="text-xs px-2 py-1 rounded border border-[oklch(0.4_0.03_50)] text-[#f0ebe0] hover:bg-[oklch(0.35_0.03_50)] transition-colors">
              {isFullscreen ? "⛶ Exit" : "⛶ Full"}
            </button>
          </div>
          {/* Editor area */}
          <EditorContent
            editor={editor}
            className="min-h-[320px] p-4 bg-card border border-t-0 border-border rounded-b-lg text-foreground text-sm leading-relaxed outline-none [&_.tiptap]:outline-none [&_.tiptap]:min-h-[300px] [&_.tiptap_img]:max-w-full [&_.tiptap_img]:cursor-pointer [&_.tiptap_img]:resize [&_.tiptap_img]:overflow-auto"
            data-ocid="article_form.editor"
          />
          {/* Hidden file input for images */}
          <input ref={editorImageInputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleEditorImageFile(f); e.target.value = ""; }} />
        </div>
        {errors.content && (
          <span data-ocid="article_form.content_field_error">
            <InlineError message={errors.content} />
          </span>
        )}
      </div>

      {/* Toggles */}
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        <div className="flex items-center justify-between px-4 py-3.5">
          <div>
            <p className="type-body font-medium text-foreground">
              Premium Article
            </p>
            <p className="type-meta text-muted-foreground">
              Requires HERO token payment to read
            </p>
          </div>
          <Switch
            checked={values.isPremium}
            onCheckedChange={(checked) => set("isPremium", checked)}
            data-ocid="article_form.premium_toggle"
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <div>
            <p className="type-body font-medium text-foreground">
              Publish Immediately
            </p>
            <p className="type-meta text-muted-foreground">
              Make this article publicly visible right away
            </p>
          </div>
          <Switch
            checked={values.publishNow}
            onCheckedChange={(checked) => set("publishNow", checked)}
            data-ocid="article_form.publish_toggle"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="gap-2"
          data-ocid="article_form.submit_button"
        >
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
        <Button
          type="button"
          variant="ghost"
          asChild
          data-ocid="article_form.cancel_button"
        >
          <Link to={backTo}>Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
