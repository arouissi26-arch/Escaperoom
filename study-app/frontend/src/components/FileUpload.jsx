import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiX, FiCheck } from 'react-icons/fi';
import { documentAPI } from '../services/api';
import { useI18n } from '../utils/i18n';
import { useDocumentStore } from '../store/useStore';

export default function FileUpload({ onUploadSuccess }) {
  const { t } = useI18n();
  const { addDocument } = useDocumentStore();

  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [error, setError] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
        '.docx'
      ],
      'application/msword': ['.doc'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    maxSize: 10485760, // 10MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      setError('');

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === 'file-too-large') {
          setError(t('upload.maxSize'));
        } else {
          setError(t('upload.supported'));
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setPreview({
          name: file.name,
          size: file.size,
          type: file.type,
          file
        });
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  });

  const handleUpload = async () => {
    if (!preview) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', preview.file);
    formData.append('title', title || preview.name);
    if (subject) {
      formData.append('subject', subject);
    }

    try {
      setProcessing(true);
      const response = await documentAPI.upload(formData, (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      });

      addDocument(response.data.document);

      // Reset
      setPreview(null);
      setTitle('');
      setSubject('');
      setProgress(0);

      if (onUploadSuccess) {
        onUploadSuccess(response.data.document);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      setProcessing(false);
    }
  };

  const cancelPreview = () => {
    setPreview(null);
    setTitle('');
    setSubject('');
    setError('');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (preview) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('upload.title')}
          </h3>
          <button
            onClick={cancelPreview}
            disabled={uploading}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center gap-3">
          <FiFile className="text-primary-500" size={24} />
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white">
              {preview.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatFileSize(preview.size)}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('upload.titlePlaceholder')}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('upload.titlePlaceholder')}
              disabled={uploading}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('upload.subjectPlaceholder')}
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t('upload.subjectPlaceholder')}
              disabled={uploading}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          {uploading && (
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>
                  {processing ? t('upload.processing') : t('upload.uploading')}
                </span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || !title}
            className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {processing ? t('upload.processing') : t('upload.uploading')}
              </>
            ) : (
              <>
                <FiCheck size={20} />
                {t('upload.title')}
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
          }`}
      >
        <input {...getInputProps()} />
        <FiUpload
          className="mx-auto mb-4 text-gray-400 dark:text-gray-500"
          size={48}
        />
        <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {isDragActive
            ? t('upload.dragDrop')
            : t('upload.dragDrop')}
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-1">
          {t('upload.or')}
        </p>
        <p className="text-primary-500 font-medium mb-4">
          {t('upload.browse')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {t('upload.supported')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('upload.maxSize')}
        </p>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
