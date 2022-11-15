import { FC } from 'react';

import classnames from 'classnames';

import Button from 'components/button';
import Icon from 'components/icon';
import Modal from 'components/modal';

import type { ConfirmationPromptProps } from './types';

export const ConfirmationPrompt: FC<ConfirmationPromptProps> = ({
  title,
  description,
  open,
  dismissible = true,
  icon,
  onDismiss,
  onAccept,
  onRefuse,
}: ConfirmationPromptProps) => (
  <Modal
    open={open}
    title={title}
    size="s"
    dismissable={dismissible}
    onOpenChange={(o) => {
      onDismiss(o);
    }}
  >
    <div className="px-8 py-4">
      <div className="leading-1 font-heading mt-8 text-xl font-medium text-gray-800 sm:mt-0 sm:pr-32">
        {title}
      </div>
      <p className="mt-4 text-sm text-gray-400 sm:pr-32">{description}</p>
      <div
        className={classnames({
          'flex items-end justify-start': true,
          'mt-10 sm:mt-12': !icon && !description,
          'mt-8': !icon && !!description,
          'mt-10 sm:mt-1': !!icon && !description,
          'mt-8 sm:-mt-2': !!icon && !!description,
        })}
      >
        <Button theme="secondary" size="base" className="mr-5 shrink-0" onClick={onRefuse}>
          No
        </Button>
        <Button theme="primary" size="base" className="shrink-0 sm:mr-5" onClick={onAccept}>
          Yes
        </Button>

        {icon && <Icon icon={icon} className="ml-auto hidden w-36 shrink grow sm:block" />}
      </div>
    </div>
  </Modal>
);

export default ConfirmationPrompt;
