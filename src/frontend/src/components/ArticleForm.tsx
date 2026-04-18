import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ImageIcon, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import { ExternalBlob } from "../backend";
import { InlineError } from "./ErrorMessage";
import "react-quill-new/dist/quill.snow.css";

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

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link"],
    ["clean"],
  ],
};

const QUILL_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "blockquote",
  "code-block",
  "link",
];

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

  const set = useCallback(
    <K extends keyof ArticleFormValues>(key: K, val: ArticleFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: val }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [],
  );

  const handleImageSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
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
    if (!values.content.trim() || values.content === "<p><br></p>")
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
                JPG, PNG, WebP up to 5MB
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
        <div
          className="rounded-lg overflow-hidden border border-border bg-card [&_.ql-toolbar]:bg-muted/40 [&_.ql-toolbar]:border-border [&_.ql-container]:border-border [&_.ql-editor]:min-h-[320px] [&_.ql-editor]:font-body [&_.ql-editor]:text-foreground [&_.ql-editor]:text-sm [&_.ql-editor]:leading-relaxed [&_.ql-toolbar.ql-snow]:border-border [&_.ql-container.ql-snow]:border-border [&_.ql-editor.ql-blank::before]:text-muted-foreground [&_.ql-stroke]:stroke-foreground [&_.ql-fill]:fill-foreground [&_.ql-picker-label]:text-foreground"
          data-ocid="article_form.editor"
        >
          <ReactQuill
            theme="snow"
            value={values.content}
            onChange={(val) => set("content", val)}
            modules={QUILL_MODULES}
            formats={QUILL_FORMATS}
            placeholder="Write your article here…"
          />
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
