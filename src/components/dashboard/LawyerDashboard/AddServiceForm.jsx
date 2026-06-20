"use client";

import React, { useState } from "react";
import {
  FaGavel,
  FaBriefcase,
  FaUsers,
  FaLightbulb,
  FaShieldAlt,
  FaHome,
  FaPlus,
  FaSave,
  FaUndo,
  FaHeartbeat,
  FaUniversity,
  FaBalanceScale,
} from "react-icons/fa";
import {
  Card,
  Select,
  Label,
  Description,
  ListBox,
  Button,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  TextArea,
  TextField,
  Spinner,
} from "@heroui/react";
import { toast } from "sonner";
import { uploadImageToImgBB } from "@/utils/uploadImage";
import { useUserSession } from "@/core/session-client";
import { createLawyerService } from "@/services/lawyers/lawyerMutations";
import { FaFileInvoiceDollar, FaPassport, FaUserTie } from "react-icons/fa6";

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
  {
    id: "cat_family",
    name: "Family & Divorce",
    slug: "family",
    icon: FaUsers,
  },
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
  {
    id: "cat_tax",
    name: "Tax Law",
    slug: "tax",
    icon: FaFileInvoiceDollar,
  },
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

export default function AddServiceForm({ onPublish }) {
  const { user, isPending: isSessionLoading } = useUserSession();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("No file chosen...");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("No file chosen...");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add a service!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image");

    if (!imageFile || imageFile.size === 0) {
      toast.error("Please select a profile photo!");
      return;
    }

    if (!selectedCategory) {
      toast.error("Please select a specialization category!");
      return;
    }

    setIsUploading(true);
    const uploadedImageUrl = await uploadImageToImgBB(imageFile);

    if (!uploadedImageUrl) {
      setIsUploading(false);
      return;
    }

    const data = {};
    formData.forEach((value, key) => {
      if (key !== "image" && key !== "specialization") {
        data[key] = value.toString();
      }
    });

    data.specialization = selectedCategory;
    data.image = uploadedImageUrl;
    data.status = "Available";

    data.lawyerEmail = user.email;
    data.lawyerName = user.name;
    data.lawyerId = user.id;
    data.createdAt = new Date().toISOString();

    try {
      const result = await createLawyerService(data);

      if (result?.error) {
        toast.error(result.message);
        return;
      }

      if (result) {
        toast.success("Service published successfully!");
        if (onPublish) onPublish(result);

        e.target.reset();
        setFileName("No file chosen...");
        setSelectedCategory("");
      }
    } catch (error) {
      console.error("Form execution error:", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setIsUploading(false);
    }
  };

  if (isSessionLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Spinner size="md" label="Loading profile session..." color="success" />
      </div>
    );
  }

  return (
    <Card className="bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-none p-4 md:p-6 shadow-sm">
      <Form className="w-full" onSubmit={handleSubmit}>
        <Fieldset>
          <Fieldset.Legend className="text-lg font-bold flex items-center gap-2">
            <FaPlus className="text-success text-sm" /> Add Legal Service
          </Fieldset.Legend>
          <Description className="text-zinc-500 dark:text-zinc-400 text-xs mb-6">
            Fill in the details below to list a new service on your lawyer
            profile.
          </Description>

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-5 space-y-0">
            {/* 🎯 ১. Professional Name */}
            <TextField isRequired name="name" className="w-full">
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                Professional Name
              </Label>
              <Input
                placeholder="e.g. Barrister Your Name"
                className="bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-none mt-1 h-10"
              />
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

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
                  className="mt-1"
                  placeholder="Select a legal domain"
                  selectedKeys={selectedCategory ? [selectedCategory] : []}
                  onSelectionChange={(keys) => {
                    const val =
                      keys && (keys instanceof Set || typeof keys === "object")
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
                      <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                        <Icon className="text-success text-sm shrink-0" />
                        {selected.name}
                      </span>
                    );
                  }}
                >
                  <Select.Trigger className="bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-none w-full py-2.5 px-3 flex items-center justify-between min-h-10 leading-none [&>span]:flex [&>span]:items-center [&>span]:gap-2">
                    <Select.Value className="text-zinc-700 dark:text-zinc-300" />
                    <Select.Indicator className="text-zinc-400 flex items-center justify-center" />
                  </Select.Trigger>
                  <Select.Popover className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-none shadow-xl mt-1">
                    <ListBox className="p-1">
                      {STATIC_CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <ListBox.Item
                            id={cat.name}
                            key={cat.name}
                            textValue={cat.name}
                            className="hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-none cursor-pointer flex items-center gap-2 transition-colors"
                          >
                            <Icon className="text-success text-sm shrink-0" />
                            <Label className="cursor-pointer">{cat.name}</Label>
                          </ListBox.Item>
                        );
                      })}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* 🎯 ৩. Consultation Fee */}
            <TextField isRequired name="fee" type="number" className="w-full">
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                Consultation Fee (Hourly Rate / USD $)
              </Label>
              <Input
                placeholder="e.g. 50"
                className="bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-none mt-1 h-10"
              />
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

            {/* 🎯 ৪. Profile Photo */}
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                Profile Photo
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
                  id="file-upload"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="text-xs font-semibold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-none cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shrink-0"
                >
                  Choose Image
                </label>
              </div>
            </div>

            {/* 🎯 ৫. Service Bio & Summary */}
            <div className="md:col-span-2 w-full">
              <TextField
                name="bio"
                validate={(value) =>
                  value && value.length > 200
                    ? "Bio cannot exceed 200 characters"
                    : null
                }
                className="w-full"
              >
                <Label className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                  Service Bio & Summary
                </Label>
                <TextArea
                  placeholder="Describe your legal expertise..."
                  maxLength={200}
                  className="bg-transparent border border-zinc-300 dark:border-zinc-800 rounded-none mt-1 h-20 resize-none"
                />
                <Description className="text-zinc-400 dark:text-zinc-500 text-[11px] mt-1">
                  Maximum 200 characters allowed
                </Description>
                <FieldError className="text-danger text-xs mt-1" />
              </TextField>
            </div>
          </FieldGroup>

          <Fieldset.Actions className="mt-6 flex items-center gap-3 justify-end">
            <Button
              type="reset"
              variant="secondary"
              className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2.5 min-w-0 rounded-none h-9 w-9 flex items-center justify-center transition-colors"
              title="Reset Form"
              onClick={() => {
                setFileName("No file chosen...");
                setSelectedCategory("");
              }}
            >
              <FaUndo className="text-zinc-900 dark:text-zinc-100 text-sm" />
            </Button>

            <Button
              type="submit"
              isDisabled={isUploading}
              className="bg-success text-zinc-950 font-bold px-6 py-2 rounded-none hover:bg-success/90 flex items-center justify-center gap-2 transition-all text-sm h-9 relative"
            >
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spinner size="sm" color="current" />
                </div>
              )}

              <span
                className={`flex items-center gap-2 ${isUploading ? "invisible" : ""}`}
              >
                <FaSave /> Publish Listing
              </span>
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </Card>
  );
}
