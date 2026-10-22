import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'
import Button from './Button'

export default function ConfirmModal({ open, onClose, onConfirm, title, message, loading }) {
  return (
    <Modal open={open} onClose={onClose} title={title || 'Confirmer la suppression'} size="sm">
      <div className="flex gap-3">
        <div className="h-fit flex-shrink-0 rounded-full bg-red-100 p-2">
          <AlertTriangle className="text-red-600" size={22} />
        </div>
        <p className="text-sm text-slate-700">
          {message || 'Cette action est irréversible. Voulez-vous vraiment continuer ?'}
        </p>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>Annuler</Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>Supprimer</Button>
      </div>
    </Modal>
  )
}
