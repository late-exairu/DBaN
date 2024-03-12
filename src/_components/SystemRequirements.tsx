import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type GameRequirements } from "@/types";

export default function SystemRequirements(props: GameRequirements) {
  const { platforms } = props;

  const platformsArray = platforms
    .filter(
      (game) => game.requirements.minimum ?? game.requirements.recommended,
    )
    .map((game) => ({
      id: game.platform.id,
      name: game.platform.name,
      slug: game.platform.slug,
      minimum: game.requirements.minimum?.replace(/Minimum:\n/g, ""),
      recommended:
        game.requirements.recommended?.replace(/Recommended:\n/g, "") ?? null,
    }))
    .sort((a, b) => a.id - b.id);

  platformsArray.map((platform) => console.log(platform));

  return (
    <Tabs defaultValue={platformsArray[0]?.slug} className="my-4">
      <TabsList className="mb-2">
        {platformsArray.map((platform) => (
          <TabsTrigger key={platform.id} value={platform.slug}>
            {platform.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {platformsArray.map((platform) =>
        platform.minimum ? (
          <TabsContent key={platform.id} value={platform.slug}>
            <div className="grid grid-cols-2 gap-4">
              {platform.minimum ? (
                <div className="col-span-2">
                  <p className="text-sm font-bold text-slate-600">Minimum</p>
                  <div
                    className="prose mt-2 max-w-none text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: platform.minimum,
                    }}
                  />
                </div>
              ) : null}

              {platform.recommended ? (
                <div className="col-span-2">
                  <p className="text-sm font-bold text-slate-600">
                    Recommended
                  </p>
                  <div
                    className="prose mt-2 max-w-none text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: platform.recommended,
                    }}
                  />
                </div>
              ) : null}
            </div>
          </TabsContent>
        ) : null,
      )}
    </Tabs>
  );
}
