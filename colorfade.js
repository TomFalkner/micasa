        <script>
            $(document).ready(function(){
                $('.original').each(function(){
                    $(this).clone().removeClass('original').addClass('colorImg').appendTo($(this).parent());
                    var toGray = $(this);
                    toGray[0].src = grayscale(toGray[0]);
                });
            });
            $('.portfolio li a').mouseenter(function(e) {
                $(e.currentTarget).children('.colorImg').fadeIn();
            });

            $('.portfolio li a').mouseleave(function(e) {
                $(e.currentTarget).children('.colorImg').fadeOut();
            });

            function grayscale(originalImage) {
                var canvas = document.createElement('canvas'),
                    context = canvas.getContext('2d'),
                    grayImage = new Image();

                grayImage.src = originalImage.src;
                canvas.width = originalImage.width;
                canvas.height = originalImage.height;

                context.drawImage(grayImage, 0, 0);
                var imgPix = context.getImageData(0, 0, canvas.width, canvas.height);
                for(var y = 0; y < imgPix.height; y++) {
                    for (var x = 0; x < imgPix.width; x++) {
                        var i = (y * 4) * imgPix.width + x * 4;
                        var avg = (imgPix.data[i] + imgPix.data[i + 1] + imgPix.data[i + 2]) / 3;

                        imgPix.data[i] = avg;
                        imgPix.data[i + 1] = avg;
                        imgPix.data[i + 2] = avg;
                    }
                }

                context.putImageData(imgPix, 0, 0, 0, 0, imgPix.width, imgPix.height);
                return canvas.toDataURL();
            }
        </script>
