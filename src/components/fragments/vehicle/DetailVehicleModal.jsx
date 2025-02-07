import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const DetailVehicleModal = ({ open, onClose, vehicle }) => {
  if (!vehicle) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vehicle Details</DialogTitle>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="grid gap-4">
          {[
            { label: "Brand", value: vehicle.brand },
            { label: "Type", value: vehicle.type },
            { label: "Production Year", value: vehicle.production_year },
          ].map(({ label, value }, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium text-muted-foreground">{label}</span>
              <span className="font-medium capitalize">{value}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailVehicleModal;
