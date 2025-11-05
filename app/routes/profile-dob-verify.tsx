import "react-phone-number-input/style.css";
import Modal from "@/components/ui/modal/Modal";
import { useState } from "react";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Button from "@/components/ui/button/Button";
import { Field, Fieldset, Input, Label } from "@headlessui/react";
import { useNavigate } from "react-router";

export default function ProfileDobVerify() {
  const { setUserInfo } = useCurrentUser();
  const navigate = useNavigate();

  const [dob, setDob] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      isOpen={true}
      onClose={() => {
        navigate(-1);
      }}
      onBack={() => {
        navigate(-1);
      }}
      title="Add Birthday"
      isFullScreen
    >
      <div className="bg-white h-full">
        <div className="h-px"></div>
        <div className="">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLoading(true);

              const response = await fetch(
                import.meta.env.VITE_API_URL + "/auth/user/update/",
                {
                  method: "PUT",

                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${Cookies.get("userToken")}`,
                  },
                  body: JSON.stringify({
                    dob: dob,
                  }),
                }
              );
              const responseData = await response.json();
              if (responseData.status === "ok") {
                setUserInfo(responseData.data);
                navigate(-1);
                toast.success(responseData.message);
                setIsLoading(false);
              } else {
                toast.error(responseData.errors);
                setIsLoading(false);
              }
            }}
          >
            <Fieldset className="p-[2.6666666667vw]! m-[2.6666666667vw]! sm:p-2.5! sm:m-2.5! space-y-[2.6666666667vw] sm:space-y-2.5">
              <Field className="space-y-[2.6666666667vw] sm:space-y-2.5">
                <Label className="flex text-[#474747] text-[3.7333333333vw] sm:text-sm h-[6.4vw] sm:h-6 leading-[6.4vw] sm:leading-6">
                  Birthday
                </Label>
                <Input
                  type="date"
                  required
                  name="dob"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                  max={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 18)
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                  className="w-full h-[12vw] sm:h-11.25 p-[0_4.2666666667vw] sm:px-4 border border-gray-1 bg-gray-1 text-foreground-200 rounded text-[3.2vw]! sm:text-xs!"
                />
              </Field>
            </Fieldset>

            <Button
              color="green"
              type="submit"
              className="w-[calc(100%-10.6666666667vw)] sm:w-[calc(100%-40px)] m-[2.6666666667vw_auto]! sm:m-[10px_auto]! block text-[4vw]! sm:text-[15px]! h-[12vw] sm:h-11.25 leading-[12vw] sm:leading-11.25"
              disabled={!dob}
              isLoading={isLoading}
            >
              Submit
            </Button>

            <p className="text-[#999] text-[3.7333333333vw] p-[2.6666666667vw_5.3333333333vw] sm:py-2.5 sm:px-5 sm:text-sm">
              For your privacy, the information cannot be modified after
              confirmation.If you need help, please contact{" "}
              <span className="text-blue-1">Customer Service</span>.
            </p>
          </form>
        </div>
      </div>
    </Modal>
  );
}
