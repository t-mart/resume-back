import './index.scss';

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

  if (rightBleeds || bottomBleeds) {
    return true;
  }
  return false;
}

function highlightBigElements() {
  const refElement = document.querySelector('.contents');
  if (!refElement) {
    throw new Error('couldn\'t find reference element');
  }
  document.querySelectorAll('.contents *').forEach((element) => {
    if (element.childElementCount > 0) {
      return;
    }
    if (elementIsTooBig(element, refElement)) {
      const e = element as HTMLElement;
      console.log(e);
      e.style.backgroundColor = 'palevioletred';
    }
  });
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    highlightBigElements();
  }
});
