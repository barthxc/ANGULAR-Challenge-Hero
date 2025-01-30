import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    limit: number = 4,
    finishString: string = '...',
    tag: string = 'span',
    classes: string[] = []
  ): string {
    if (!value) return '';

    if (value.length <= limit) {
      return value;
    }

    const truncatedText = value.substring(0, limit) + finishString;

    const classString = classes.length > 0 ? ` ${classes.join(' ')}` : '';

    return `<${tag} class="truncate-text${classString}  " title="${value}">${truncatedText}</span>`;
  }
}
