"use client";

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

interface Props {
  formValue: File[];
  onFormValueChange: (files: File[]) => void;
  maxFiles: number
  maxSize?: number; // in bytes, default is 2MB
  disabled?: boolean;
}

export default function FileUploader({ formValue, onFormValueChange, maxFiles, disabled, maxSize }: Props) {
  const onFileValidate = React.useCallback(
    (file: File): string | null => {

      // Validate file type (only images)
      if (
        file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && // .xlsx
        file.type !== "application/vnd.ms-excel" // .xls
      ) {
        return "Apenas arquivos Excel (.xlsx, .xls) são permitidos";
      }

      // Validate file size (max 2MB)
      const MAX_SIZE = maxSize ?? 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_SIZE) {
        return `Arquivo ser menor que ${MAX_SIZE / (1024 * 1024)}MB`;
      }

      return null;
    },
    [maxSize],
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast.error(message, {
      description: `Arquivo "${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" foi rejeitado`,
    });
  }, []);

  return (
    <FileUpload
      value={formValue}
      onValueChange={onFormValueChange}
      onFileValidate={onFileValidate}
      onFileReject={onFileReject}
      disabled={disabled}
      accept=".xlsx, .xls"
      maxFiles={maxFiles}
      className="w-full"
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Arraste e solte o arquivo aqui</p>
          <p className="text-muted-foreground text-xs">
            ou clique para buscar
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Buscar arquivo
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {formValue.map((file, index) => (
          <FileUploadItem key={`${file.name}-${index}`} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button variant="ghost" size="icon" className="size-7">
                <X />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}