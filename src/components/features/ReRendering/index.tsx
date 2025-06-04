import { FormProvider } from "react-hook-form";
import ReRenderingForm from "./_components/Form";
import useReRenderingForm from "./_components/Form/form";
import { ReRenderingProvider } from "./context/reRenderContext";
import FirstName from "./_components/FirstName";
import AnimatedOverlay from "../../ui/Animated";

function ReRendering() {
  const userId = null;
  const { form } = useReRenderingForm(userId);
  return (
    <AnimatedOverlay>
      <ReRenderingProvider>
        <FormProvider {...form}>
          <ReRenderingForm />
        </FormProvider>
        <FirstName />
      </ReRenderingProvider>
    </AnimatedOverlay>
  );
}

export default ReRendering;
