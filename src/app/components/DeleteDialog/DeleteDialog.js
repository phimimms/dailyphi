import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/Button/Button';
import Dialog from 'components/Dialog/Dialog';
import { formatToken } from 'util/localization';

function DeleteDialog({ isOpen, name, onClose, onDelete, title, tokens }) {
  return (
    <Dialog
      actions={
        [
          <Button
            isFlat={true}
            label={tokens.global.cancel}
            onClick={onClose}
          />,
          <Button
            isFlat={true}
            label={tokens.global.confirm}
            onClick={onDelete}
          />,
        ]
      }
      isOpen={isOpen}
      title={title}
    >
      <div>{formatToken(tokens.DeleteDialog.confirmDelete, name)}</div>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  tokens: PropTypes.object.isRequired,
};

export default DeleteDialog;
