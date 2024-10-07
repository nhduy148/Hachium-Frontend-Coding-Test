/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { createRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

type Item = {
  id: string;
  title: string | React.ReactNode;
  message: string | React.ReactNode;
  cancelText?: string | React.ReactNode;
  confirmText?: string | React.ReactNode;
  onConfirm?: (...args: any[]) => Promise<any> | any;
  onCancel?: (...args: any[]) => Promise<any> | any;
  disableConfirm?: boolean;
};

type DataShowMessage = {
  title: React.ReactNode;
  message: React.ReactNode;
  cancelText?: React.ReactNode;
  confirmText?: React.ReactNode;
  onConfirm?: (...args: any[]) => Promise<any> | any;
  onCancel?: (...args: any[]) => Promise<any> | any;
  disableConfirm?: boolean;
};

const ConfirmDialogComponent = forwardRef(function Component(_, ref) {
  useImperativeHandle(
    ref,
    () => ({
      show: ({ message, title, cancelText, confirmText, onCancel, onConfirm, disableConfirm }: DataShowMessage) => {
        setQueueData((d) =>
          d.concat([
            {
              id: crypto.randomUUID(),
              message: message,
              title: title,
              cancelText: cancelText,
              confirmText: confirmText,
              onCancel,
              onConfirm,
              disableConfirm,
            },
          ]),
        );
      },
    }),
    [],
  );

  const [queueData, setQueueData] = useState<Array<Item>>([]);
  const [data, setData] = useState<Item[]>([]);

  const onPop = useCallback((item: Item) => {
    setQueueData((d) => {
      const _queueData = d.filter((x) => x.id !== item.id);
      setData(_queueData);
      return _queueData;
    });
  }, []);

  const onConfirm = useCallback(
    (item: Item) => (e: any) => {
      onPop(item);
      item?.onConfirm?.(e);
    },
    [onPop],
  );

  const onCancel = useCallback(
    (item: Item) => (e: any) => {
      onPop(item);
      item?.onCancel?.(e);
    },
    [onPop],
  );

  const _renderItem = (item: Item) => {
    const disableConfirm = item?.disableConfirm;
    return (
      <Dialog open onClose={onCancel(item)}>
        <DialogTitle>
          <Typography variant="subtitle1" textAlign="center">
            {item.title}
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ minHeight: 80 }}>
          <DialogContentText>
            <Typography variant="body2" textAlign="center">
              {item.message}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            sx={{ minWidth: 120, width: !disableConfirm ? 1 : undefined }}
            color="inherit"
            variant="text"
            onClick={onCancel(item)}
          >
            {item.cancelText ?? 'Hủy'}
          </Button>
          {!disableConfirm && (
            <Button size="small" sx={{ minWidth: 120 }} fullWidth autoFocus onClick={onConfirm(item)}>
              {item.confirmText ?? 'Xác nhận'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  useEffect(() => {
    if (queueData.length > 0) {
      setData([queueData[0]]);
    }
  }, [queueData]);

  return data.map(_renderItem);
});
type ConfirmDialog = {
  show: (data: DataShowMessage) => void;
};
export const confirmDialogRef = createRef<ConfirmDialog>();
export const ConfirmDialog = () => <ConfirmDialogComponent ref={confirmDialogRef} />;

export const showConfirmDialog = (props: DataShowMessage) => {
  confirmDialogRef.current?.show(props);
};
