

export type SlideLayout = {
  showTitle: boolean;
  showSubtitle: boolean;
  showButton: boolean;
  align: 'center' | 'left' | 'right';
};

export type SlideStyle = 'default' | 'left' | 'right';
export var SlideStyles: {
  [key in SlideStyle]: SlideLayout;
} = {
  default: {
    showTitle: true,
    showSubtitle: true,
    showButton: true,
    align: 'center',
  },
  left: {
    showTitle: true,
    showSubtitle: true,
    showButton: true,
    align: 'left',
  },
  right: {
    showTitle: true,
    showSubtitle: true,
    showButton: true,
    align: 'right',
  },
}
