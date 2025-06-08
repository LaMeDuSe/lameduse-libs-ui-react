type SlideLayout = {
  showTitle: boolean;
  showSubtitle: boolean;
  showButton: boolean;
  align: 'center' |'left' |'right';
};


export default function getSlideLayout(style: string): SlideLayout {
  if (style ==='style1') {
    return {
      showTitle: true,
      showSubtitle: true,
      showButton: false,
      align:'left',
    };
  } else if (style ==='style2') {
    return {
      showTitle: true,
      showSubtitle:false,
      showButton: true,
      align: 'center',
    };
  } else {
    // style === 'default' ou toute autre valeur inconnue
    return {
      showTitle:true,
      showSubtitle: true,
      showButton:true,
      align: 'center',
    };
  }
}

