import { GetGlobal } from "@benbraide/inlinejs";
import { ICanvasPosition, ICanvasSize } from "../types";
import { TestPoint } from "../utilities/test-point";
import { CanvasFullShape } from "./full-shape";

export class CanvasText extends CanvasFullShape{
    private font_ = '';
    
    public constructor(){
        super({
            'font-family': 'sans-serif',
            'font-size': '1rem',
            'font-style': 'normal',
            'font-weight': 'normal',
            'line-height': 'normal',
            align: <CanvasTextAlign>'left',
            baseline: <CanvasTextBaseline>'top',
            direction: <CanvasDirection>'inherit',
            value: '',
        });

        this.font_ = this.ComputeFont_();
    }

    public GetSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        if (!ctx){
            return { width: 0, height: 0 };
        }
        
        let metrics = ctx.measureText(this.ComputeValue_());
        let height = (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
        
        return { width: metrics.width, height };
    }

    public GetFixedSize(ctx: CanvasRenderingContext2D | null): ICanvasSize{
        return this.GetSize(ctx);
    }

    public ContainsPoint(point: ICanvasPosition, ctx: CanvasRenderingContext2D){
        this.ApplyStyles_(ctx);
        
        let position = this.GetOffsetPosition_(), metrics = ctx.measureText(this.ComputeValue_());
        let height = (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
        
        return TestPoint(point, position, { width: metrics.width, height }, this.GetTransformScale());
    }
    
    protected Render_(ctx: CanvasRenderingContext2D | Path2D){
        ('save' in ctx) && ctx.save();

        this.ApplyStyles_(ctx);
        
        let position = this.GetUnscaledOffsetPosition_(('stroke' in ctx) ? ctx : undefined);
        if (this.state_.mode === 'stroke' && 'strokeText' in ctx){
            ctx.strokeText(this.ComputeValue_(), position.x, position.y, (this.state_.size.width || undefined));
        }
        else if (this.state_.mode !== 'stroke' && 'fillText' in ctx){
            ctx.fillText(this.ComputeValue_(), position.x, position.y, (this.state_.size.width || undefined));
        }

        ('restore' in ctx) && ctx.restore();
    }

    protected AttributeChanged_(name: string){
        super.AttributeChanged_(name);
        ['font-family', 'font-size', 'font-style', 'font-weight', 'line-height'].includes(name) && (this.font_ = this.ComputeFont_());
    }

    private ApplyStyles_(ctx: CanvasRenderingContext2D | Path2D){
        ('font' in ctx) && (ctx.font = this.font_);
        ('textAlign' in ctx) && (ctx.textAlign = this.state_.align);
        ('textBaseline' in ctx) && (ctx.textBaseline = this.state_.baseline);
        ('direction' in ctx) && (ctx.direction = this.state_.direction);
    }

    private ComputeFont_(){
        let parts = new Array<string>();

        parts.push((this.state_['line-height'] === 'normal') ? this.state_['font-size'] : `${this.state_['font-size']}/${this.state_['line-height']}`);
        parts.push(this.state_['font-family'] || 'san-serif');

        (this.state_['font-style'] !== 'normal') && parts.push(this.state_['font-style']);
        (this.state_['font-weight'] !== 'normal') && parts.push(this.state_['font-weight']);
        
        return parts.join(' ');
    }

    private ComputeValue_(){
        return (this.state_.value || this.textContent?.trim() || '');
    }
}

export function CanvasTextCompact(){
    customElements.define(GetGlobal().GetConfig().GetDirectiveName('canvas-text'), CanvasText);
}
