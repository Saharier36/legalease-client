"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Modal,
  Button,
  Spinner,
  Select,
  Label,
  Description,
  ListBox,
  FieldError,
  Fieldset,
  TextField,
  Form,
} from "@heroui/react";
import {
  FaGavel,
  FaBriefcase,
  FaUsers,
  FaLightbulb,
  FaShieldAlt,
  FaHome,
  FaSave,
  FaHeartbeat,
  FaUniversity,
  FaBalanceScale,
  FaTimes,
} from "react-icons/fa";
import { FaFileInvoiceDollar, FaPassport, FaUserTie } from "react-icons/fa6";
import { uploadImageToImgBB } from "@/utils/uploadImage";
import { MdModeEdit } from "react-icons/md";
import { updateLawyerService } from "@/services/actions";

const STATIC_CATEGORIES = [
  {
    id: "cat_criminal",
    name: "Criminal Defense",
    slug: "criminal",
    icon: FaGavel,
  },
  {
    id: "cat_corporate",
    name: "Corporate & Business",
    slug: "corporate",
    icon: FaBriefcase,
  },
  { id: "cat_family", name: "Family & Divorce", slug: "family", icon: FaUsers },
  {
    id: "cat_ip",
    name: "Intellectual Property",
    slug: "intellectual-property",
    icon: FaLightbulb,
  },
  {
    id: "cat_cyber",
    name: "Cyber & IT Law",
    slug: "cyber-it",
    icon: FaShieldAlt,
  },
  {
    id: "cat_property",
    name: "Real Estate & Property",
    slug: "real-estate",
    icon: FaHome,
  },
  {
    id: "cat_immigration",
    name: "Immigration Law",
    slug: "immigration",
    icon: FaPassport,
  },
  { id: "cat_tax", name: "Tax Law", slug: "tax", icon: FaFileInvoiceDollar },
  {
    id: "cat_employment",
    name: "Employment Law",
    slug: "employment",
    icon: FaUserTie,
  },
  {
    id: "cat_civil",
    name: "Civil Litigation",
    slug: "civil-litigation",
    icon: FaBalanceScale,
  },
  {
    id: "cat_banking",
    name: "Banking & Finance Law",
    slug: "banking-finance",
    icon: FaUniversity,
  },
  {
    id: "cat_injury",
    name: "Personal Injury & Medical Law",
    slug: "personal-injury",
    icon: FaHeartbeat,
  },
];

export default function EditServiceModal({ service, onRefresh }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(
    service?.specialization || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("No file chosen...");

  if (!service) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "No file chosen...");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image");

    let uploadedImageUrl = service.image;

    if (imageFile && imageFile.size > 0) {
      const url = await uploadImageToImgBB(imageFile);
      if (url) {
        uploadedImageUrl = url;
      } else {
        setIsSubmitting(false);
        return;
      }
    }

    if (!selectedCategory) {
      toast.error("Please select a specialization category!");
      setIsSubmitting(false);
      return;
    }

    const updatedInfo = {
      name: formData.get("name").toString(),
      specialization: selectedCategory,
      fee: Number(formData.get("fee")),
      bio: formData.get("bio").toString(),
      image: uploadedImageUrl,
    };

    try {
      const serviceId = service._id?.$oid || service._id;
      const result = await updateLawyerService(serviceId, updatedInfo);

      if (result && !result.error) {
        toast.success("Service updated successfully");
        if (typeof onRefresh === "function") {
          onRefresh();
        } else {
          router.refresh();
        }
      } else {
        toast.error("Failed to update service");
      }
    } catch (error) {
      console.error("Failed to update service:", error);
      toast.error("Failed to update service");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Modal>
        <Button
          size="sm"
          className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2.5 min-w-0 rounded-none h-8 w-8 flex items-center justify-center transition-colors"
          title="Edit Service"
        >
          <MdModeEdit className="text-xs text-zinc-800 dark:text-zinc-200" />
        </Button>

        <Modal.Backdrop className="bg-black/50 backdrop-blur-sm">
          <Modal.Container
            placement="center"
            className="w-full max-w-lg mx-auto p-4 flex items-center justify-center"
          >
            <Modal.Dialog className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-none shadow-2xl overflow-hidden relative w-full max-h-[90vh] flex flex-col">
              <Modal.CloseTrigger className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors z-10">
                <FaTimes size={14} />
              </Modal.CloseTrigger>

              <Modal.Header className="p-5 border-b border-zinc-100 dark:border-zinc-900 shrink-0">
                <div className="flex items-center gap-2">
                  <MdModeEdit className="text-success text-xl" />
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                    Edit Legal Service
                  </h2>
                </div>
              </Modal.Header>

              <Form
                onSubmit={onSubmit}
                className="w-full bg-transparent flex flex-col min-h-0 h-full overflow-hidden"
              >
                <Modal.Body className="p-5 flex-1 overflow-y-auto w-full subtle-scrollbar space-y-4">
                  <Fieldset className="space-y-4 w-full">
                    {/*  Professional Name */}
                    <TextField isRequired name="name" className="w-full">
                      <Label className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                        Professional Name
                      </Label>
                      <input
                        type="text"
                        name="name"
                        required
                        defaultValue={service.name}
                        placeholder="e.g. Barrister Your Name"
                        className="w-full bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-none mt-1 h-10 px-3 text-sm focus:outline-none focus:border-success/60 text-zinc-900 dark:text-zinc-100"
                      />
                      <FieldError className="text-danger text-xs mt-1" />
                    </TextField>

                    {/*  Specialization / Category */}
                    <div className="flex flex-col gap-1 w-full">
                      <Label className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                        Specialization / Category
                      </Label>
                      <div className="relative w-full">
                        <input
                          type="hidden"
                          name="specialization"
                          value={selectedCategory}
                        />
                        <Select
                          className="mt-1 w-full"
                          placeholder="Select a legal domain"
                          selectedKeys={
                            selectedCategory ? [selectedCategory] : []
                          }
                          onSelectionChange={(keys) => {
                            const val =
                              keys &&
                              (keys instanceof Set || typeof keys === "object")
                                ? Array.from(keys)[0]
                                : keys;
                            setSelectedCategory(val || "");
                          }}
                          renderValue={() => {
                            const selected = STATIC_CATEGORIES.find(
                              (c) => c.name === selectedCategory,
                            );
                            if (!selected)
                              return (
                                <span className="text-zinc-400">
                                  Select a legal domain
                                </span>
                              );
                            const Icon = selected.icon;
                            return (
                              <span className="flex flex-row items-center gap-2.5 text-zinc-700 dark:text-zinc-300 w-full">
                                <Icon className="text-success text-sm shrink-0" />
                                <span className="truncate">
                                  {selected.name}
                                </span>
                              </span>
                            );
                          }}
                        >
                          <Select.Trigger className="bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-none w-full py-2.5 px-3 flex flex-row items-center justify-between min-h-10 leading-none [&>span]:flex [&>span]:flex-row [&>span]:items-center [&>span]:gap-2.5">
                            <Select.Value className="text-zinc-700 dark:text-zinc-300" />
                            <Select.Indicator className="text-zinc-400 flex items-center justify-center shrink-0" />
                          </Select.Trigger>
                          <Select.Popover className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none shadow-xl mt-1 max-h-48 overflow-y-auto">
                            <ListBox className="p-1">
                              {STATIC_CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                  <ListBox.Item
                                    id={cat.name}
                                    key={cat.name}
                                    textValue={cat.name}
                                    className="hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-none cursor-pointer flex flex-row items-center gap-2.5 transition-colors [&>span]:flex [&>span]:flex-row [&>span]:items-center [&>span]:gap-2.5"
                                  >
                                    <Icon className="text-success text-sm shrink-0" />
                                    <Label className="cursor-pointer text-sm">
                                      {cat.name}
                                    </Label>
                                  </ListBox.Item>
                                );
                              })}
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>
                    </div>

                    {/*  Consultation Fee */}
                    <TextField
                      isRequired
                      name="fee"
                      type="number"
                      className="w-full"
                    >
                      <Label className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                        Consultation Fee (Hourly Rate / USD $)
                      </Label>
                      <input
                        type="number"
                        name="fee"
                        required
                        defaultValue={service.fee}
                        placeholder="e.g. 50"
                        className="w-full bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-none mt-1 h-10 px-3 text-sm focus:outline-none focus:border-success/60 text-zinc-900 dark:text-zinc-100"
                      />
                      <FieldError className="text-danger text-xs mt-1" />
                    </TextField>

                    {/*  Profile Photo Update */}
                    <div className="flex flex-col gap-1 w-full">
                      <Label className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                        Update Photo (Optional)
                      </Label>
                      <div className="w-full h-10 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-none px-4 bg-transparent flex items-center justify-between mt-1 hover:border-success/40 transition-colors">
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 truncate mr-2">
                          {fileName}
                        </span>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          className="hidden"
                          id="edit-file-upload"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="edit-file-upload"
                          className="text-xs font-semibold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-none cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shrink-0"
                        >
                          Choose Image
                        </label>
                      </div>
                    </div>

                    {/*  Service Bio & Summary */}
                    <div className="w-full">
                      <TextField name="bio" className="w-full">
                        <Label className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                          Service Bio & Summary
                        </Label>
                        <textarea
                          name="bio"
                          defaultValue={service.bio}
                          placeholder="Describe your legal expertise..."
                          maxLength={200}
                          className="w-full bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-none mt-1 h-20 p-3 text-sm focus:outline-none focus:border-success/60 text-zinc-900 dark:text-zinc-100 resize-none"
                        />
                        <Description className="text-zinc-400 dark:text-zinc-500 text-[11px] mt-1">
                          Maximum 200 characters allowed
                        </Description>
                        <FieldError className="text-danger text-xs mt-1" />
                      </TextField>
                    </div>
                  </Fieldset>
                </Modal.Body>

                <Modal.Footer className="p-5 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-end gap-3 bg-zinc-50 dark:bg-zinc-900/20 w-full shrink-0">
                  <Button
                    slot="close"
                    type="button"
                    className="bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium px-5 h-9 rounded-none text-sm transition-colors"
                  >
                    Cancel
                  </Button>

                  <Button
                    slot="close"
                    type="submit"
                    isLoading={isSubmitting}
                    className="bg-success text-zinc-950 font-bold px-6 h-9 rounded-none hover:bg-success/90 flex items-center justify-center gap-2 transition-all text-sm"
                  >
                    <FaSave /> Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
