module PlaidApi
  class Transactions < PlaidApiBase
    def call
      access_token = Rails.cache.read("plaid_access_token")
      raise StandardError.new("Permission denied") if access_token.blank?

      # Set cursor to empty to receive all historical updates
      cursor = ''

      # New transaction updates since "cursor"
      added = []
      modified = []
      removed = [] # Removed transaction ids
      has_more = true
      # Iterate through each page of new transaction updates for item
      while has_more
        request = Plaid::TransactionsSyncRequest.new({
                                                       access_token: access_token,
                                                       cursor: cursor
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
      # Return the 8 most recent transactions
      added.sort_by(&:date).map(&:to_hash)
    rescue Plaid::ApiError => e
      log_error(e)
      raise e
    end
  end
end
