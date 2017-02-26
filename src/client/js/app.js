const maxImagePerRow = 4;

const initPage = () => {
    initNavBar();
    initGallery();
    activateComponents();
};

const activateComponents = () => {
    $(".dropdown-button").dropdown({
        belowOrigin: true
    });
}

const initNavBar = () => {
    const body = $('body');
    const navBarEl = $(window.render.navBar());
    body.append(navBarEl);
}

const initGallery = () => {
    const body = $('body');
    const viewModel = createGalleryViewModel(imageList);
    const galleryEl = $(window.render.gallery(viewModel));
    body.append(galleryEl);
};

const createGalleryViewModel = (imagesInfoList) => {
    let numberOfImagesInCurrentRow = 0;
    let sliderPosition = 0;
    let currentRow;

    const model = {
        rows: []
    }

    imagesInfoList.forEach((imageInfo) => {
        if (numberOfImagesInCurrentRow === maxImagePerRow) {
            model.rows.push(currentRow);
            currentRow = [];
            numberOfImagesInCurrentRow = 0;
        }
        if (!currentRow) {
            currentRow = [];
        }
        imageInfo.position = sliderPosition++;
        currentRow.push(imageInfo);

        numberOfImagesInCurrentRow++;
    });

    if (currentRow) {
        model.rows.push(currentRow);
    }

    return model;
};

$(initPage)