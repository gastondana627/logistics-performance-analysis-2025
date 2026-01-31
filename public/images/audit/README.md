# Audit Shift Images

This directory contains the Samsung Health screenshots for each audit shift.

## Required Images

Place your Samsung Health screenshots here with the following names:

1. **Day_1_Samsung_Health.jpg** - December 4, 2025 (Peak - Day 1 Setup)
2. **Day_2_Samsung_Health.jpg** - December 2, 2025 (Peak - Day 2 Max Volumetric)
3. **Day_3_Samsung_Health.jpg** - December 10, 2025 (Peak - Day 3 Optimization)

## Image Specifications

### Recommended Format
- **Format**: JPG or PNG
- **Dimensions**: 800x600px minimum (4:3 aspect ratio)
- **File Size**: Under 500KB for optimal loading
- **Quality**: High resolution for clarity

### Content Guidelines
- Screenshot should show Samsung Health app interface
- Include visible metrics (steps, calories, active time)
- Ensure date is visible in the screenshot
- Remove any sensitive personal information

## File Paths in JSON

The images are referenced in `data/ups_health_clean.json` as:

```json
{
  "metadata": {
    "img_url": "/images/audit/Day_1_Samsung_Health.jpg"
  }
}
```

## Fallback Behavior

If images are not found, the component will display:
- A gradient placeholder background
- The Next.js Image component will show an error in development
- In production, ensure all images are present before deployment

## Adding New Images

1. Place image file in this directory
2. Update the `img_url` in `data/ups_health_clean.json`
3. Restart the dev server to see changes

## Image Optimization

Next.js automatically optimizes images:
- Lazy loading
- Responsive sizing
- WebP conversion (when supported)
- Blur placeholder (optional)

## Example Screenshot Content

Each screenshot should ideally show:
- ✅ Date of the shift
- ✅ Total steps count
- ✅ Calories burned
- ✅ Active minutes
- ✅ Samsung Health branding
- ✅ Heart rate data (if available)

---

**Note**: These images are for portfolio/educational purposes. Ensure you have the right to use and display these screenshots publicly.
