import { HOUSE_MODELS, AMENITIES, NAV_ITEMS } from '../../constants';

export function buildContext(): string {
    const modelsContext = HOUSE_MODELS.map(model => `
[[Model: ${model.name}]]
- ID: ${model.id}
- Description: ${model.description}
- Specs: ${model.specs.map(s => `${s.label}: ${s.value}`).join(', ')}
- Image: ${model.image}
`).join('\n');

    const amenitiesContext = AMENITIES.map(amenity => `
[[Amenity: ${amenity.title}]]
- Description: ${amenity.description}
`).join('\n');

    const navContext = NAV_ITEMS.map(item => `- ${item.label} (${item.id})`).join('\n');

    return `
=== PROJECT DATA SOURCE ===
You are the official concierge for "Bosques California Residencial".
Use ONLY the following data to answer. Do not hallucinate.

LOCATION:
Tlajomulco de Zúñiga, Jalisco, MX. Access via Av. López Mateos Sur.
Near: Galerías Santa Anita, Punto Sur.

FINANCING:
Accepted: Infonavit, Fovissste, Bancarios.
Free processing support.

HOUSE MODELS:
${modelsContext}

AMENITIES:
${amenitiesContext}

SITE NAVIGATION:
${navContext}

CONTACT:
Phone: +52-33-1071-0957
Email: info@bosquescalifornia.com
=== END DATA SOURCE ===
`;
}
