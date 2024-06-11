import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  rates!: any[];
  loading = true;
  error: any;
  constructor(private readonly apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            rates(currency: "USD") {
              currency
              rate
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.rates = result.data?.rates;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
