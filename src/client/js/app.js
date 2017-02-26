const maxImagePerRow = 4;

const initPage = () => {
    initGallery();
    activateComponents();
};

const activateComponents = () => {
    $(".dropdown-button").dropdown({
        belowOrigin: true
    });
}

const initGallery = () => {
    const container = $('#main-content');
    let numberOfImagesInCurrentRow = 0;
    let currentRow;
    let sliderPosition = 0;

    imageList.forEach((imageInfo) => {
        if (numberOfImagesInCurrentRow === maxImagePerRow) {
            container.append(currentRow);
            currentRow = null;
            numberOfImagesInCurrentRow = 0;
        }
        if (!currentRow) {
            currentRow = $('<div class="row"></div>');
        }
        const imageGalleryElement = $(`
                    <div class="col s12 m6 l3">
                        <div class="card small">
                            <div class="card-image">
                                <img data-image-id="${imageInfo.id}" src="${imageInfo.src}">
                            </div>
                            <div class="card-content">
                                <span class="grey-text text-darken-4 image-description" title="${imageInfo.text}"><span class="date">${imageInfo.date} :</span> ${imageInfo.text}</span>
                                <div class="image-menu">
                                    <i class="zmdi zmdi-more-vert zmdi-hc-lg right dropdown-button" data-activates="imageMenuDropdown${imageInfo.id}"></i>
                                    <ul id="imageMenuDropdown${imageInfo.id}" class="dropdown-content">
                                        <li><a class="center"><i class="zmdi zmdi-rotate-left"></i>Left</a></li>
                                        <li><a class="center"><i class="zmdi zmdi-rotate-right"></i>Right</a></li>
                                        <li><a class="center"><i class="zmdi zmdi-refresh"></i>180°</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`);
        imageInfo.position = sliderPosition++;
        currentRow.append(imageGalleryElement);

        numberOfImagesInCurrentRow++;
    });

    if (currentRow) {
        container.append(currentRow);
        currentRow = null;
    }
};

$(initPage)