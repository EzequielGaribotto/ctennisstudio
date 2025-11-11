"""
Remove white background from images and optionally convert to WebP format.

Usage:
    python remove_bg.py <image_path> [--to-webp]

Examples:
    python remove_bg.py "public/images/logo.png"
    python remove_bg.py "public/images/logo.png" --to-webp
"""

import sys
import os
from PIL import Image
import numpy as np

def remove_white_background(image_path, to_webp=False):
    """
    Remove white background from an image and save with _new suffix.
    
    Args:
        image_path: Absolute or relative path to the image
        to_webp: If True, convert to WebP format
    """
    # Check if file exists
    if not os.path.exists(image_path):
        print(f"❌ Error: File not found: {image_path}")
        return False
    
    print(f"Loading image: {image_path}")
    
    # Load the image
    img = Image.open(image_path)
    
    # Convert to RGBA if not already
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Convert to numpy array
    data = np.array(img)
    
    # Get the RGB channels
    red, green, blue, alpha = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    
    # Define white threshold (adjust if needed - values close to white)
    # Pixels with RGB values above this threshold will be considered white
    white_threshold = 240
    
    # Create mask for white pixels (where R, G, B are all above threshold)
    white_mask = (red > white_threshold) & (green > white_threshold) & (blue > white_threshold)
    
    # Set alpha to 0 (transparent) for white pixels
    data[white_mask, 3] = 0
    
    # Create new image from modified data
    result = Image.fromarray(data, mode='RGBA')
    
    # Generate output filename
    file_dir = os.path.dirname(image_path)
    file_name = os.path.basename(image_path)
    name_without_ext, ext = os.path.splitext(file_name)
    
    # Determine output format and extension
    if to_webp:
        output_ext = '.webp'
        output_format = 'WEBP'
    else:
        # Keep original format but ensure it supports transparency
        if ext.lower() in ['.jpg', '.jpeg']:
            output_ext = '.png'  # JPEG doesn't support transparency
            output_format = 'PNG'
        else:
            output_ext = ext
            output_format = ext[1:].upper()
    
    # Create output path with _new suffix
    output_name = f"{name_without_ext}_new{output_ext}"
    output_path = os.path.join(file_dir, output_name)
    
    # Save the image
    if output_format == 'WEBP':
        result.save(output_path, format=output_format, quality=95, lossless=False)
    else:
        result.save(output_path, format=output_format)
    
    print(f"✅ Successfully processed image!")
    print(f"   Output: {output_path}")
    print(f"   Format: {output_format}")
    
    # Get file sizes for comparison
    original_size = os.path.getsize(image_path)
    new_size = os.path.getsize(output_path)
    
    print(f"   Original size: {original_size / 1024:.2f} KB")
    print(f"   New size: {new_size / 1024:.2f} KB")
    
    if new_size < original_size:
        savings = ((original_size - new_size) / original_size) * 100
        print(f"   Size reduction: {savings:.1f}%")
    
    return True

def main():
    """Main function to parse arguments and run the background removal."""
    
    # Check arguments
    if len(sys.argv) < 2:
        print("❌ Error: No image path provided")
        print("\nUsage:")
        print("  python remove_bg.py <image_path> [--to-webp]")
        print("\nExamples:")
        print('  python remove_bg.py "public/images/logo.png"')
        print('  python remove_bg.py "public/images/logo.png" --to-webp')
        sys.exit(1)
    
    # Get image path
    image_path = sys.argv[1]
    
    # Check for --to-webp flag
    to_webp = '--to-webp' in sys.argv
    
    # Process the image
    success = remove_white_background(image_path, to_webp)
    
    if not success:
        sys.exit(1)
    
    print("\n✨ Done!")

if __name__ == "__main__":
    main()
