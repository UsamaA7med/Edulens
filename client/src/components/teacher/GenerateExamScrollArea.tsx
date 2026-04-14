import { ScrollArea } from '../ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'

const GenerateExamScrollArea = () => {
  return (
    <div>
      <ScrollArea className="h-72 overflow-y-auto rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">
            Select Questions
          </h4>
          <FieldSet>
            <FieldGroup className="gap-3">
              <Field orientation="horizontal">
                <Checkbox
                  id="finder-pref-9k2-hard-disks-ljj-checkbox"
                  name="finder-pref-9k2-hard-disks-ljj-checkbox"
                />
                <FieldLabel
                  htmlFor="finder-pref-9k2-hard-disks-ljj-checkbox"
                  className="font-normal"
                >
                  Hard disks
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="finder-pref-9k2-external-disks-1yg-checkbox"
                  name="finder-pref-9k2-external-disks-1yg-checkbox"
                />
                <FieldLabel
                  htmlFor="finder-pref-9k2-external-disks-1yg-checkbox"
                  className="font-normal"
                >
                  External disks
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="finder-pref-9k2-cds-dvds-fzt-checkbox"
                  name="finder-pref-9k2-cds-dvds-fzt-checkbox"
                />
                <FieldLabel
                  htmlFor="finder-pref-9k2-cds-dvds-fzt-checkbox"
                  className="font-normal"
                >
                  CDs, DVDs, and iPods
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="finder-pref-9k2-connected-servers-6l2-checkbox"
                  name="finder-pref-9k2-connected-servers-6l2-checkbox"
                />
                <FieldLabel
                  htmlFor="finder-pref-9k2-connected-servers-6l2-checkbox"
                  className="font-normal"
                >
                  Connected servers
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
        </div>
      </ScrollArea>
    </div>
  )
}

export default GenerateExamScrollArea
