"use client";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  singleAction?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText,
  cancelText,
  singleAction = false,
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-2xl border border-[color:var(--gold)]/35 bg-[linear-gradient(150deg,rgba(255,252,246,0.96),rgba(248,236,214,0.92))] p-5 shadow-[0_18px_34px_rgba(56,34,13,0.2)]">
        <p className="heading-serif text-2xl text-[color:var(--ink)]">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]">{message}</p>

        <div className="mt-5 flex justify-end gap-2.5">
          {singleAction ? null : (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-[color:var(--gold)]/45 bg-white/85 px-4 py-2 text-sm text-[color:var(--ink-soft)] hover:bg-white hover:text-[color:var(--ink)]"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={onConfirm}
            className={danger
              ? "rounded-full border border-[#ad3d3d] bg-[#b83b3b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9f2e2e]"
              : "rounded-full border border-[color:var(--gold)]/55 bg-[color:var(--gold)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--gold-deep)]"
            }
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
