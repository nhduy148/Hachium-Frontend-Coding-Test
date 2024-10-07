import { MoreVert } from '@mui/icons-material';
import { IconButton, IconButtonProps, Menu, MenuItem, MenuItemProps, MenuProps, PopoverOrigin } from '@mui/material';
import React from 'react';

export type ActionItem = {
  label: React.ReactNode;
  onClick?: (...args: any[]) => void;
  menuProps?: MenuItemProps;
};

interface IProps {
  actions: ActionItem[];
  icon?: React.ReactNode;
  size?: IconButtonProps['size'];
  position?: [
    PopoverOrigin['vertical'],
    PopoverOrigin['horizontal'],
    PopoverOrigin['vertical'],
    PopoverOrigin['horizontal'],
  ];
  TriggerComponent?: React.ReactNode;
  MenuProps?: Omit<MenuProps, 'anchorEl' | 'open' | 'onClose'>;
}

export const ActionMenu: React.FC<IProps> = ({
  actions,
  size = 'medium',
  position = ['center', 'left', 'center', 'right'],
  TriggerComponent,
  MenuProps,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const renderActionItem = React.useCallback((action: ActionItem, index: number) => {
    return (
      <MenuItem
        key={index}
        onClick={(...e) => {
          action.onClick?.(...e);
          handleCloseMenu();
        }}
        {...action.menuProps}
      >
        {action.label}
      </MenuItem>
    );
  }, []);
  const renderTriggerComponent = React.useMemo(() => {
    if (React.isValidElement(TriggerComponent)) {
      return React.cloneElement(TriggerComponent, {
        // @ts-expect-error - not sure why this is throwing an error
        onClick: handleClick,
        size: size,
      });
    }
    return (
      <IconButton onClick={handleClick} size={size}>
        <MoreVert fontSize="inherit" />
      </IconButton>
    );
  }, [TriggerComponent, size]);
  return (
    <React.Fragment>
      {renderTriggerComponent}
      <Menu
        {...MenuProps}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: position[0],
          horizontal: position[1],
        }}
        transformOrigin={{
          vertical: position[2],
          horizontal: position[3],
        }}
      >
        {actions.map(renderActionItem)}
      </Menu>
    </React.Fragment>
  );
};
