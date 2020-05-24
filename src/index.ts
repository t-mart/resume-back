import './index.scss';
import './toolbar.scss';

function getElementBottomRight(element: Element, includeBorderAndMargin: boolean) {
  let {
    top,
    left,
    bottom,
    right,
  } = element.getBoundingClientRect();
  if (includeBorderAndMargin) {
    const style = window.getComputedStyle(element);
    top += parseInt(style.borderTop, 10) + parseInt(style.marginTop, 10);
    left += parseInt(style.borderLeft, 10) + parseInt(style.marginLeft, 10);
    right += parseInt(style.borderRight, 10) + parseInt(style.marginRight, 10);
    bottom += parseInt(style.borderBottom, 10) + parseInt(style.marginBottom, 10);
  }
  return {
    top,
    left,
    bottom,
    right,
  };
}

function elementIsTooBig(element: Element, refElement: Element) {
  // get refElements bottom and right (excluding margin and border)
  // get element bottom and right (INCLUDING MARGIN AND BORDER)
  // return true if there's overlap
  const elementBR = getElementBottomRight(element, true);
  const refElementBR = getElementBottomRight(refElement, false);

  const rightBleeds = (refElementBR.right - elementBR.right) < 0;
  const bottomBleeds = (refElementBR.bottom - elementBR.bottom) < 0;

  return rightBleeds || bottomBleeds;
}

function highlightBigElements() {
  const refElement = document.querySelector('#contents');
  let hasBigElement = false;
  if (!refElement) {
    throw new Error('couldn\'t find reference element');
  }
  document.querySelectorAll('#contents *').forEach((element) => {
    // the above query selector will match on every elem in the dom that is a parent of the
    // offending too-big elements. We don't want to highlight all of it, just the leaf
    // children, so we test for childlessness on the next line.
    if (elementIsTooBig(element, refElement) && element.childElementCount === 0) {
      hasBigElement = true;
      const e = element as HTMLElement;
      e.style.backgroundColor = '#d62728';
    }
  });
  return hasBigElement;
}

const marginLines = document.getElementById('margin-lines');
const showMarginsInput = document.getElementById('show-margins') as HTMLInputElement;
const fitsMessage = document.getElementById('content-fits');
const doesntFitMessage = document.getElementById('content-doesnt-fit');
const storage = window.localStorage;

function getShowMargins() {
  const showMarginsStorageValue = storage.getItem('showMargins');
  let showMargins = false;
  if (showMarginsStorageValue) {
    showMargins = JSON.parse(showMarginsStorageValue);
  }
  return showMargins;
}

function setMarginElementsFromStorage() {
  // sets it from local storage
  const showMargins = getShowMargins();
  marginLines!.hidden = !showMargins;
  showMarginsInput!.checked = showMargins;
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    setMarginElementsFromStorage();

    showMarginsInput!.addEventListener('change', () => {
      const showMargins = showMarginsInput.checked;
      storage.setItem('showMargins', JSON.stringify(showMargins));
      marginLines!.hidden = !showMargins;
    });

    if (highlightBigElements()) {
      fitsMessage!.hidden = true;
      doesntFitMessage!.hidden = false;
    } else {
      doesntFitMessage!.hidden = true;
      fitsMessage!.hidden = false;
    }
  }
});
