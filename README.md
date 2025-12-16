# Instructivo para añadir imagenes a experencias

## 1. Optimizar imagenes a .webp

Coloca las imagenes en la carpeta "public"
Usa el script de python optimize_images.py:
Abre la terminal y ejecuta  
`python .\optimize_images.py`

## 2. Generar el manifest de imagenes

Abre la terminal y ejecuta
`node .\generate-image-manifest.mjs`

## 3. Mover la imagen a la carpeta correspondiente (si no está aún)

## 4. Cambiar el nombre al formato correcto

## 5. Verificar que las imagenes se añaden correctamente
- Correr la página localmente
Abre la terminal y ejecuta  
`npm run dev`

## 6. Hacer commit y push
Asegurarte de que estas aca:  
`C:\Users\pablo\Desktop\CTS\ctennisstudio>`  
- Desde la terminal, ejecutar  
`git add .`  
`git commit -m "añadida imagen engie biarritz"`  
`git push`


## Husky

`npm install --save-dev husky lint-staged`  

`npx husky install`
`npx husky add .husky/pre-commit "npx lint-staged"`
