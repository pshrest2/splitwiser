module PlaidApi
  class Transactions < PlaidApiBase
    def call(account_id)
      access_token = Account.find(account_id).access_token
      raise StandardError, "Permission denied" if access_token.blank?

      # Set cursor to empty to receive all historical updates
      cursor = ""

      # New transaction updates since "cursor"
      added = []
      modified = []
      removed = [] # Removed transaction ids
      has_more = true
      # Iterate through each page of new transaction updates for item
      while has_more
        request = Plaid::TransactionsSyncRequest.new({
                                                       access_token:,
                                                       cursor:
                                                     })
        response = client.transactions_sync(request)
        # Add this page of results
        added += response.added
        modified += response.modified
        removed += response.removed
        has_more = response.has_more
        # Update cursor to the next cursor
        cursor = response.next_cursor
      end
      # Return the 10 most recent transactions
      added.sort_by(&:date).map(&:to_hash).first(10)
    rescue Plaid::ApiError => e
      log_error(e)
      raise e
    end
  end
end
