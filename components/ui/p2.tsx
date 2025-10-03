"use client"

import * as React from "react";
import { 
  Mic, 
  Send, 
  X,
  Settings2,
  Plus,
  Globe,
  PenTool,
  Lightbulb,
  Telescope,
  Paintbrush,
  ChevronUp,
  ChevronDown,
  Pause
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as DialogPrimitive from "@radix-ui/react-dialog";

// Simple shadcn/ui components inline
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const toolsList = [
  { id: 'createImage', name: 'Create an image', icon: Paintbrush },
  { id: 'searchWeb', name: 'Search the web', icon: Globe },
  { id: 'writeCode', name: 'Write or code', icon: PenTool },
  { id: 'deepResearch', name: 'Run deep research', icon: Telescope, extra: '5 left' },
  { id: 'thinkLonger', name: 'Think for longer', icon: Lightbulb },
];

interface PromptBoxProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSubmit'> {
  onSubmit?: (value: string) => void;
  showCollapseButton?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isLoading?: boolean;
  onStopRequest?: () => void;
}

export const PromptBox = React.forwardRef<HTMLTextAreaElement, PromptBoxProps>(
  ({ className, onSubmit, value: externalValue, onChange, showCollapseButton = false, isCollapsed = false, onToggleCollapse, isLoading = false, onStopRequest, ...props }, ref) => {
    const internalTextareaRef = React.useRef<HTMLTextAreaElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = React.useState("");
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [selectedTool, setSelectedTool] = React.useState<string | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    // Use external value if provided, otherwise use internal state
    const value = externalValue !== undefined ? String(externalValue) : internalValue;
    
    const setValue = (val: string) => {
      if (externalValue !== undefined) {
        // If controlled, call onChange to update parent state
        onChange?.({ target: { value: val } } as React.ChangeEvent<HTMLTextAreaElement>);
      } else {
        // If uncontrolled, update internal state
        setInternalValue(val);
      }
    };

    React.useImperativeHandle(ref, () => internalTextareaRef.current!, []);

    React.useLayoutEffect(() => {
      const textarea = internalTextareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        const newHeight = Math.min(textarea.scrollHeight, 300);
        textarea.style.height = `${newHeight}px`;
      }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      
      if (externalValue !== undefined) {
        // If controlled, just call onChange - don't call setValue
        if (onChange) onChange(e);
      } else {
        // If uncontrolled, update internal state
        setInternalValue(newValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
      event.target.value = "";
    };

    const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const handleToolSelect = (toolId: string) => {
      setSelectedTool(toolId);
      setIsPopoverOpen(false);
    };

    const handleSubmit = () => {
      if (hasValue && onSubmit) {
        onSubmit(value);
        // Clear the input after submission
        if (externalValue !== undefined) {
          // If controlled, trigger onChange with empty value
          onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLTextAreaElement>);
        } else {
          // If uncontrolled, clear internal state
          setInternalValue("");
        }
      }
    };

    const hasValue = value.trim().length > 0 || imagePreview;

    return (
      <div
        className={cn(
          "relative rounded-xl transition-all duration-300 bg-background/90 backdrop-blur-md border border-border overflow-hidden shadow-lg w-full max-w-3xl mx-auto",
          className
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative mb-1 w-fit rounded-lg px-1 pt-1">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="relative w-[58px] h-[58px] transition-transform hover:scale-105"
                >
                  <Image
                    src={imagePreview}
                    alt="Image preview"
                    className="rounded-lg object-cover"
                    fill
                    sizes="58px"
                    priority
                  />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] max-h-[90vh]">
                <div className="relative w-full h-[80vh]">
                  <Image
                    src={imagePreview}
                    alt="Full size preview"
                    className="rounded-lg object-contain"
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                </div>
              </DialogContent>
            </Dialog>

            <button
              onClick={handleRemoveImage}
              className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              aria-label="Remove image"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Absolute Left Icons: Only Plus (add image) */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 group"
                >
                  <Plus className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Absolute Right Icons */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
          {/* Settings (Tools Popover) */}
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 group"
                    >
                      <Settings2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    </button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tools</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <PopoverContent side="top" className="w-64 p-2">
              <div className="grid gap-2">
                {toolsList.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleToolSelect(tool.id)}
                      className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">{tool.name}</span>
                        {tool.extra && (
                          <span className="text-xs text-muted-foreground">{tool.extra}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>

          {/* Pause Button - Only show when loading. Parent must set isLoading=true while awaiting response. */}
          {isLoading && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={onStopRequest}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-destructive hover:text-destructive-foreground hover:bg-destructive/90 transition-all duration-200 group z-20"
                    aria-label="Pause response"
                  >
                    <Pause className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pause response</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* Collapse Button - Only show when chat exists */}
          {showCollapseButton && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={onToggleCollapse}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 group"
                  >
                    {isCollapsed ? (
                      <ChevronUp className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isCollapsed ? "Expand chat" : "Collapse chat"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* Send Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 group",
                    hasValue
                      ? "text-primary-foreground bg-primary hover:bg-primary/90"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  disabled={!hasValue}
                >
                  <Send className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Textarea: full width, padding for icons */}
        <textarea
          ref={internalTextareaRef}
          rows={1}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask me about the ocean..."
          className="w-full resize-none border-0 bg-transparent pl-14 pr-14 py-2 text-white placeholder:text-slate-400 focus:ring-0 focus-visible:outline-none min-h-[40px] text-base font-medium"
          style={{ minHeight: 36, maxHeight: 300, overflowY: 'auto' }}
          {...props}
        />
      </div>
    );
  }
);

PromptBox.displayName = "PromptBox";