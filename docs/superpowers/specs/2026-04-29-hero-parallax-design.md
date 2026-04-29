# Design Spec: Playful Mouse Parallax for ImmersiveHero

Adding a premium, interactive mouse parallax effect to the hero section to enhance visual depth and engagement.

## 1. Objective
Transform the static/subtly animated hero section into a dynamic, "alive" space where elements react playfully to the user's mouse movement.

## 2. Approach: High-Performance Parallax
To ensure 60fps performance and avoid React re-render bottlenecks:
- **Direct DOM Manipulation:** Use a `mousemove` event listener on the container `useRef`.
- **CSS Variables:** Update `--mouse-x` and `--mouse-y` variables (ranging from -0.5 to 0.5) on the container's inline style.
- **Hardware Acceleration:** Use `translate3d` and `will-change: transform` on all target layers.
- **Damping:** Apply a smooth `transition: transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)` to the target elements.

## 3. Layer Mapping (Playful Intensity)
The parallax effect follows the mouse movement, with offsets scaled by layer depth:

| Layer | Elements | Max Offset (px) | Multiplier |
| :--- | :--- | :--- | :--- |
| **Deep Background** | Amber/Orange Blur Blobs | ±15px | 30 |
| **Mid Background** | Red Dates SVG Pattern | ±25px | 50 |
| **Main Product** | `datesPlate` (Product Plate) | ±40px | 80 |
| **Product Badges** | "Harvest 2026", "Freshness Seal" | ±50px | 100 |
| **UI Foreground** | Heading, Paragraph, Buttons | ±8px | 16 |

## 4. Interaction Details
- **Activation:** The effect only triggers when the mouse is over the `ImmersiveHero` section.
- **Reset:** On `mouseleave`, all variables transition back to `0`, returning elements to their natural center.
- **Synergy:** Existing CSS `float-slow` and `drift` animations remain active, creating a complex, multi-layered motion system.

## 5. Success Criteria
- [ ] No visible stutter during mouse movement.
- [ ] Elements reset smoothly when the mouse leaves.
- [ ] Text remains highly legible during interaction.
- [ ] Zero impact on the performance of other page sections.
