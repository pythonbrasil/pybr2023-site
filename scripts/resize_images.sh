!/bin/bash
IMAGE_SIZES=("200" "260" "300" "400" "460")
CURRENT_DIR=${PWD}
OUTPUT_DIR="responsive"
IMG_QUALITY=100

### Does the output directory exists? If not, create it!
if [ ! -d "$CURRENT_DIR/$OUTPUT_DIR" ]; then
  echo "Creating the output directory..."
  mkdir -p "$CURRENT_DIR/$OUTPUT_DIR"
fi

### List all files within the current directory and create some .webp versions.
for FILE in "$CURRENT_DIR"/*; do
  IMAGE=${FILE#${CURRENT_DIR}/}
  EXTENSION="${FILE##*.}"

  ### Is the file an image?
  if grep -qi ".png\|.jpg\|.jpeg\|.webp" <<<"$IMAGE"; then

    ### Does the .webp file exist? If not, create it
    echo "Generate a new .webp file for the ${IMAGE} file..."
    if ! test -f $OUTPUT_DIR/$IMAGE.webp; then
      cwebp -mt -quiet -q $IMG_QUALITY $FILE -o $OUTPUT_DIR/${IMAGE%.*}.webp
    fi

    ### It's time to generate files with other sizes.
    echo "Generate the different image sizes for the $IMAGE file..."
    for WIDTH in ${IMAGE_SIZES[*]}; do

      ### Does the file with the original extension and the given size exist?
      ### If not, create it.
      RESIZED_FILE=${OUTPUT_DIR}/${IMAGE%.*}_w${WIDTH}.${EXTENSION}
      if ! test -f $RESIZED_FILE; then
        convert $FILE -geometry ${WIDTH}x $RESIZED_FILE
      fi

      ### Does the file with the .webp extension and the given size exist?
      ### If not, create it.
      WEBP_FILE=$OUTPUT_DIR/${IMAGE%.*}_w${WIDTH}.webp
      if ! test -f $WEBP_FILE; then
        cwebp -mt -quiet -q $IMG_QUALITY -resize $WIDTH 0 $FILE -o $WEBP_FILE
      fi

    done
  fi
done