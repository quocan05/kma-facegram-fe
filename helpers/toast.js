import { useToast } from "native-base";

const toast = useToast();

export const showToast = (msg) => {
  toast.show({
    placement: "bottom",
    description: msg,
  });
};
