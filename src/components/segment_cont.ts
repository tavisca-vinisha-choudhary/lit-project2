import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface Segment {
    label: string;
    value: string;
    sublabel?: string;
}

@customElement('segmented-control1')
export class SegmentedControl extends LitElement {
    @property({ type: String }) name = 'segmented-control';

    @property({
        attribute: 'segments',
        type: Array, converter(value) {
            try {
                return JSON.parse(value!);
            }
            catch (error) {
                return [];
            }
        }
    }) segments: Segment[] = [];

    @property({ type: Number }) defaultIndex = 0;
    @property({ type: String }) size = '';
    
    @state() private activeIndex = 0;

    static styles = css`

    :host{--segment_padding: 6px 15px}
    :host([size='small']) .segment{ padding: 2px; font-size:12px;}
    .container {
      display:inline-flex;       
      
      border: 1px groove #a3a2a2;
      border-radius: 5px ;
      /* overflow: hidden; */
      /* margin-top:20px; */
      

    }
    .segment {
  display: inline-flex;   
  padding: var(--segment_padding);     
  text-align: center;
  cursor: pointer;
  /* user-select: none; */
  background-color: #eee;
  transition: background-color 0.3s;
  white-space: nowrap;  
   font-family: 'Arial', sans-serif;
  flex-direction: column; 
 
       
}

    .segment.active {
  background-color: #d5d3d3;
  color: black;
  /* font-weight: bold; */
  border-radius: 2px;
  border: 1.5px groove gray;
  box-sizing: border-box;
}
.sublabel {
  font-weight: normal;
  font-size: 0.88em;
  color: #666;
  margin-top: 2px;
  text-align:left;
}
    /* .segment:hover{
      background-color: #b9bcbe;
      
    } */

    
  `;

    connectedCallback() {
        super.connectedCallback();
        this.activeIndex = this.defaultIndex;
    }

    private onSegmentClick(index: number) {
        this.activeIndex = index;
        const selected = this.segments[index];
        this.dispatchEvent(new CustomEvent('segment-change', {
            detail: { value: selected.value, index },
            bubbles: true,
            composed: true,
        }));
    }

    render() {
        return html`
    <div class="container">
      ${this.segments.map(
            (segment, i) => html`
          <div
            class="segment ${i === this.activeIndex ? 'active' : ''}"
            @click=${() => this.onSegmentClick(i)}
          >
            ${segment.label}<span>
                ${segment?.sublabel}
            </span>
        </div>
            `
        )}
    </div>
  `;
    }

}
