import { useEffect, useRef } from 'react';

const { Menu, MenuItem } = window.require('electron').remote;

export interface IMenuItem {
  label: string;
  click: Function;
}

const useContextmenu = (menuItemArr: IMenuItem[]) => {
  const clickedElement = useRef<EventTarget | null>(null);

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
      clickedElement.current = e.target;
      menu.popup();
    };

    window.addEventListener('contextmenu', handleContextmenu);

    return () => {
      window.removeEventListener('contextmenu', handleContextmenu);
    };
  }, [menuItemArr]);

  // 这里返回的是clickedElement
  // 而不是clickedElement.current
  return clickedElement;
};

export default useContextmenu;
