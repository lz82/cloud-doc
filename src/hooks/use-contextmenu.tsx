import { useEffect, useRef } from 'react';

const { Menu, MenuItem } = window.require('electron').remote;

export interface IMenuItem {
  label: string;
  click: Function;
}

const useContextmenu = (menuItemArr: IMenuItem[], eleSelector: string) => {
  const clickedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const menu = new Menu();

    menuItemArr.forEach(({ label, click }) => {
      menu.append(
        new MenuItem({
          label,
          click
        })
      );
    });

    const handleContextmenu = (e: MouseEvent) => {
      // 根据选择器查找所有符合条件的元素
      const target = Array.from(document.querySelectorAll(eleSelector));
      // 当前右键点击的元素属于满足条件的元素时，弹出右键菜单
      if (target.findIndex((item) => item === e.target) > -1) {
        clickedElement.current = e.target as HTMLElement;
        menu.popup();
      }
    };

    window.addEventListener('contextmenu', handleContextmenu);

    return () => {
      window.removeEventListener('contextmenu', handleContextmenu);
    };
  }, [eleSelector, menuItemArr]);

  // 这里返回的是clickedElement
  // 而不是clickedElement.current
  return clickedElement;
};

export default useContextmenu;
