#!/usr/bin/env python3
"""
Image Optimizer Script

This script converts images in the public/images directory to optimized WebP format for web use.
It processes JPG, JPEG, and PNG files while skipping files in the logo directory (except e332logo.png).
"""

import os
import sys
import io
from pathlib import Path
from PIL import Image
import logging
import argparse

# Configure logging with UTF-8 encoding
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("image_optimization.log", encoding='utf-8'),
        logging.StreamHandler(io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8'))
    ]
)

# Constants
IMAGES_DIR = Path("public/images")
EXCLUDED_DIRS = ["logo"]
INCLUDED_FROM_EXCLUDED = ["e332logo.png"]  # Just the filename without directory
SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png"]
OUTPUT_FORMAT = "webp"
QUALITY = 80  # Balance between quality and file size

def should_process_file(file_path):
    """Determine if a file should be processed based on exclusion rules."""
    relative_path = str(file_path.relative_to(IMAGES_DIR))
    file_name = file_path.name
    parent_dir = file_path.parent.name
    
    # First check if the file is specifically included
    if file_name in INCLUDED_FROM_EXCLUDED:
        logging.info(f"Including {file_path} as it's in the allowed list")
        return True
    
    # Then check if the direct parent directory is in the excluded list
    if parent_dir in EXCLUDED_DIRS:
        logging.info(f"Excluding {file_path} as it's in the excluded directory '{parent_dir}'")
        return False
        
    return True

def optimize_image(file_path, output_format=OUTPUT_FORMAT, quality=QUALITY, force=False):
    """Convert image to WebP format with optimization."""
    try:
        # Create output path with new extension
        output_path = file_path.with_suffix(f".{output_format}")
        
        # Skip if WebP already exists and is newer, unless force is True
        if not force and output_path.exists() and output_path.stat().st_mtime > file_path.stat().st_mtime:
            logging.info(f"Skipping {file_path} - WebP version is newer (use --force to override)")
            return False
            
        # Open and convert image
        with Image.open(file_path) as img:
            # Preserve transparency for PNG files
            if file_path.suffix.lower() == '.png':
                if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                    img = img.convert('RGBA')
                    img.save(output_path, format=output_format.upper(), quality=quality, method=6, lossless=False)
                else:
                    img = img.convert('RGB')
                    img.save(output_path, format=output_format.upper(), quality=quality, method=6)
            else:
                img = img.convert('RGB')
                img.save(output_path, format=output_format.upper(), quality=quality, method=6)
                
        # Get file sizes
        original_size = file_path.stat().st_size
        webp_size = output_path.stat().st_size
        saved = original_size - webp_size
        percent_saved = (saved / original_size) * 100
        
        logging.info(f"Converted {file_path} to {output_path}")
        logging.info(f"  Size reduction: {original_size/1024:.1f} KB to {webp_size/1024:.1f} KB ({percent_saved:.1f}% saved)")
        
        return True
    except Exception as e:
        logging.error(f"Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all images in the directory."""
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Optimize images to WebP format')
    parser.add_argument('--force', action='store_true', help='Force reprocessing of all images')
    parser.add_argument('--list', action='store_true', help='List all images that would be processed without converting')
    args = parser.parse_args()
    
    if not IMAGES_DIR.exists():
        logging.error(f"Image directory not found: {IMAGES_DIR}")
        return
    
    logging.info("Starting image optimization")
    total_files = 0
    processed_files = 0
    
    # List all image files for debugging
    if args.list:
        logging.info("Listing all image files:")
        for file_path in IMAGES_DIR.glob("**/*"):
            if file_path.is_file() and file_path.suffix.lower() in SUPPORTED_FORMATS:
                process = should_process_file(file_path)
                logging.info(f"Found: {file_path} - Would process: {process}")
    
    # Walk through all files in the images directory
    for file_path in IMAGES_DIR.glob("**/*"):
        if not file_path.is_file():
            continue
        
        if file_path.suffix.lower() not in SUPPORTED_FORMATS:
            continue
            
        total_files += 1
        
        if should_process_file(file_path):
            if optimize_image(file_path, force=args.force):
                processed_files += 1
    
    logging.info(f"Optimization complete: Processed {processed_files} out of {total_files} images")

if __name__ == "__main__":
    main()
