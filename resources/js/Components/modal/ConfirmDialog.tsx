import React from 'react';

import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from '../ui/Button';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    isLoading = false,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
            <div className="flex items-start space-x-3 mb-5">
                <div className="w-8 h-8 rounded-md bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 flex-shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200">
                <Button variant="secondary" onClick={onClose} disabled={isLoading}>
                    Batal
                </Button>
                <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
                    Hapus
                </Button>
            </div>
        </Modal>
    );
};