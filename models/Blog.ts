import mongoose, { Schema, Document, Model } from 'mongoose';
import crypto from 'crypto';

export interface IBlog extends Document {
  title: string;
  slug: string;
  body: string;
  coverImage?: string;
  images: string[];
  published: boolean;
  previewToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  slug: { type: String, unique: true, index: true },
  body: { type: String, required: true },
  coverImage: { type: String },
  images: [{ type: String }],
  published: { type: Boolean, default: false, index: true },
  previewToken: { type: String, index: true },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now },
});

// Compound index for common query: published blogs sorted by date
BlogSchema.index({ published: 1, createdAt: -1 });

// Generate slug from title before validation if not present
BlogSchema.pre('validate', function() {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  if (!this.previewToken) {
    this.previewToken = crypto.randomBytes(16).toString('hex');
  }
  this.updatedAt = new Date();
});

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
