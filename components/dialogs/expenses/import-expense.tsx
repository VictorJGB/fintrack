import FileUploader from '@/components/file-uploader'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// icons
import { FileUp } from "lucide-react"

export default function ImportExpenseDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <FileUp className="mr-2 h-4 w-4" />
            Importar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Importar despesa</DialogTitle>
            <DialogDescription>
              Importe suas despesas a partir de um arquivo ou Excel.
            </DialogDescription>
          </DialogHeader>

          <div className='flex items-center justify-center w-full mt-6'>
            <FileUploader />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>

        </DialogContent>
      </form>
    </Dialog>
  )
}
