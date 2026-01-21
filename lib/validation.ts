// Input validation and sanitization utilities

// Sanitize string input - remove potential XSS
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    // Remove null bytes
    .replace(/\0/g, '')
    // Escape HTML entities
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Trim whitespace
    .trim();
}

// Sanitize for database (less aggressive, preserves markdown)
export function sanitizeForDB(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove potential MongoDB injection patterns
    .replace(/\$where/gi, '')
    .replace(/\$gt/gi, '')
    .replace(/\$lt/gi, '')
    .replace(/\$ne/gi, '')
    .replace(/\$regex/gi, '')
    .trim();
}

// Validate email format
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Validate URL format
export function isValidUrl(url: string): boolean {
  if (typeof url !== 'string' || !url) return true; // Allow empty
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

// Validate blog input
export interface BlogInput {
  title: string;
  body: string;
  coverImage?: string;
  images?: string[];
  published?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  sanitized?: BlogInput;
}

export function validateBlogInput(input: any): ValidationResult {
  const errors: string[] = [];

  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Invalid input'] };
  }

  // Title validation
  if (!input.title || typeof input.title !== 'string') {
    errors.push('Title is required');
  } else if (input.title.length < 3) {
    errors.push('Title must be at least 3 characters');
  } else if (input.title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }

  // Body validation
  if (!input.body || typeof input.body !== 'string') {
    errors.push('Body is required');
  } else if (input.body.length < 10) {
    errors.push('Body must be at least 10 characters');
  } else if (input.body.length > 100000) {
    errors.push('Body must be less than 100,000 characters');
  }

  // Cover image validation
  if (input.coverImage && !isValidUrl(input.coverImage)) {
    errors.push('Invalid cover image URL');
  }

  // Images array validation
  if (input.images) {
    if (!Array.isArray(input.images)) {
      errors.push('Images must be an array');
    } else if (input.images.length > 20) {
      errors.push('Maximum 20 images allowed');
    } else {
      for (const img of input.images) {
        if (!isValidUrl(img)) {
          errors.push('Invalid image URL in images array');
          break;
        }
      }
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Return sanitized input
  return {
    valid: true,
    errors: [],
    sanitized: {
      title: sanitizeForDB(input.title),
      body: sanitizeForDB(input.body),
      coverImage: input.coverImage ? sanitizeForDB(input.coverImage) : undefined,
      images: input.images?.map((img: string) => sanitizeForDB(img)),
      published: Boolean(input.published),
    },
  };
}

// Validate message/contact input
export interface MessageInput {
  name: string;
  email: string;
  message: string;
}

export function validateMessageInput(input: any): ValidationResult & { sanitized?: MessageInput } {
  const errors: string[] = [];

  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Invalid input'] };
  }

  // Name validation
  if (!input.name || typeof input.name !== 'string') {
    errors.push('Name is required');
  } else if (input.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  } else if (input.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  // Email validation
  if (!input.email || typeof input.email !== 'string') {
    errors.push('Email is required');
  } else if (!isValidEmail(input.email)) {
    errors.push('Invalid email format');
  }

  // Message validation
  if (!input.message || typeof input.message !== 'string') {
    errors.push('Message is required');
  } else if (input.message.length < 10) {
    errors.push('Message must be at least 10 characters');
  } else if (input.message.length > 5000) {
    errors.push('Message must be less than 5,000 characters');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    sanitized: {
      name: sanitizeString(input.name),
      email: sanitizeString(input.email).toLowerCase(),
      message: sanitizeString(input.message),
    },
  };
}

// Validate MongoDB ObjectId
export function isValidObjectId(id: string): boolean {
  if (typeof id !== 'string') return false;
  return /^[0-9a-fA-F]{24}$/.test(id);
}

// Validate slug
export function isValidSlug(slug: string): boolean {
  if (typeof slug !== 'string') return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 200;
}
