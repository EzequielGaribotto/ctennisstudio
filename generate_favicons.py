"""
Generate favicon files from the ctennisstudio_logo.webp
This script creates all necessary favicon sizes for web and mobile devices.
The circular logo will be placed on a square background with padding.
"""

from PIL import Image, ImageDraw
import os

# Paths
logo_path = "public/images/logo/ctennisstudio_logo.webp"
output_dir = "public/images"
favicon_ico_path = "public/favicon.ico"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

print(f"Loading logo from: {logo_path}")
# Load the original logo
logo = Image.open(logo_path)

# Convert to RGBA if needed
if logo.mode != 'RGBA':
    logo = logo.convert('RGBA')

print(f"Original logo size: {logo.size}")

# Create a square canvas with the logo centered and padding
def make_square_logo(logo, padding_percent=10):
    """
    Create a square image with the logo centered and padding.
    Background is transparent, only the circular logo is visible.
    padding_percent: percentage of padding around the logo (default 10%)
    """
    # Get the maximum dimension
    max_dim = max(logo.size)
    
    # Calculate square size with padding
    square_size = int(max_dim * (1 + padding_percent / 100))
    
    # Create a transparent square background
    square_canvas = Image.new('RGBA', (square_size, square_size), (255, 255, 255, 0))
    
    # Calculate position to center the logo
    x = (square_size - logo.width) // 2
    y = (square_size - logo.height) // 2
    
    # Paste the logo onto the square canvas
    square_canvas.paste(logo, (x, y), logo if logo.mode == 'RGBA' else None)
    
    return square_canvas

# Make the logo square with padding
print("Creating square logo with padding...")
logo_square = make_square_logo(logo, padding_percent=15)
print(f"Square logo size: {logo_square.size}")

# Define the sizes we need to generate
favicon_sizes = {
    "favicon-16x16.png": (16, 16),
    "favicon-32x32.png": (32, 32),
    "apple-touch-icon.png": (180, 180),
    "android-chrome-192x192.png": (192, 192),
    "android-chrome-512x512.png": (512, 512),
}

# Generate each favicon size
for filename, size in favicon_sizes.items():
    output_path = os.path.join(output_dir, filename)
    
    # Resize with high-quality resampling
    resized = logo_square.resize(size, Image.Resampling.LANCZOS)
    
    # Save the PNG
    resized.save(output_path, format='PNG', optimize=True)
    print(f"✓ Created {filename} at {size[0]}x{size[1]}px")

# Generate favicon.ico with multiple sizes (16x16, 32x32, 48x48)
print("\nGenerating favicon.ico with multiple sizes...")
favicon_16 = logo_square.resize((16, 16), Image.Resampling.LANCZOS)
favicon_32 = logo_square.resize((32, 32), Image.Resampling.LANCZOS)
favicon_48 = logo_square.resize((48, 48), Image.Resampling.LANCZOS)

# Save as ICO with multiple sizes
favicon_16.save(
    favicon_ico_path,
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[favicon_32, favicon_48]
)
print(f"✓ Created favicon.ico with sizes: 16x16, 32x32, 48x48")

print("\n✅ All favicon files generated successfully!")
print("\nGenerated files:")
print(f"  - {favicon_ico_path}")
for filename in favicon_sizes.keys():
    print(f"  - {os.path.join(output_dir, filename)}")
