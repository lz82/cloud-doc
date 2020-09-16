const Loading = document.querySelector('#loading-mask') as HTMLElement;

export const showLoading = () => {
  Loading.style.display = 'flex';
};

export const closeLoading = () => {
  Loading.style.display = 'none';
};
